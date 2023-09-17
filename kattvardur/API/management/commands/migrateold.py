from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
import country_converter as coco
from datetime import date

import sqlite3

class Command(BaseCommand):
    help = 'Closes the specified poll for voting'

    def add_arguments(self, parser):
        parser.add_argument('old_db', nargs='+', type=str)

    def handle(self, *args, **options):
        old_db = options['old_db'][0]
        print("Starting load from file " + str(old_db))
        print("Connecting to old database")
        db = {}
        try:
            con = sqlite3.connect(old_db)
            cur = con.cursor()
        except Exception as ex:
            print("Error, connection failed")
            print(ex)
            return
        print("Connected")

        print("Starting migration process. This could take a bit of time, please wait")
        
        with(transaction.atomic()):
            db = Breeds(cur, db)
            db = Awards(cur, db)
            db = Organizations(cur, db)
            db = People(cur, db)
            db = Membership(cur, db)
            db = Catteries(cur, db)
            db = Cats(cur, db)
           # db = Ownerships(cur, db)
            db = Shows(cur, db)
        print("Data migrated, closing database")
        con.close()
        
        print("Database closed, migration complete. Have a nice day!")
        

from Awards.models import Award, Title, Certification
def Awards(cur, db):
    print("Migrating Awards")
    
    db["Award"] = {}
    db["Cert"] = {}
    db["Title"] = {}
    res = cur.execute("SELECT * FROM kkidb_award")
    awards = res.fetchall()    
    res = cur.execute("SELECT * FROM kkidb_cert")
    certs = res.fetchall()    
    res = cur.execute("SELECT * FROM kkidb_title")
    titles = res.fetchall()


    for (id, name, default, category, ranking) in awards:
        a = Award(name = name, default = default, category = category)
        a.save()
        db["Award"][id] = a

    titlemap = {}
    for (id, name, short, cert_id) in titles:
        t = Title(fullName = name, name = short)
        t.save()
        titlemap[cert_id] = t
        db["Title"][id] = t


    tempCertMap = {}
    for (id, name, rank, neuter, next_id, certClass) in certs:
        c = Certification(name = name, ranking = rank, certclass = certClass)
        if id in titlemap:
            c.title = titlemap[id] 
        c.save()
        db["Cert"][id] = c
        tempCertMap[c.id] = (id, next_id)

    for cert in Certification.objects.all():
        (id, next_id) = tempCertMap[cert.id]
        if next_id:
            cert.next = db["Cert"][next_id]
            cert.save()
        
    print("Award Migration Complete")
    return db

from Breeds.models import Breed, Color, EMS
def Breeds(cur, db):
    print("Migrating Breed app.")
    db["Breed"] = {}
    db["Color"] = {}
    db["EMS"] = {}
    
    res = cur.execute("SELECT * FROM kkidb_breed")
    breeds = res.fetchall()
    res = cur.execute("SELECT * FROM kkidb_color")
    colors = res.fetchall()
    res = cur.execute("SELECT * FROM kkidb_ems")
    ems = res.fetchall()

    for (id, breed, category, short) in breeds:
        b = Breed(breed = breed, category = category, short = short)
        b.save()
        db["Breed"][id] = b

    for (id, color, short, desc) in colors:
        c = Color(color = color, short = short, desc = desc)
        c.save()
        db["Color"][id] = c

    for (id, group, breed_id, color_id) in ems:
        e = EMS(breed = db["Breed"][breed_id], color = db["Color"][color_id], group = group)
        e.save()
        db["EMS"][id] = e

    print("Breed Migration complete")
    return db

from Cats.models import Cat, Catcolor, Registry, Microchip
def Cats(cur, db):
    print("Migrating Cat App")

    db["Cat"] = {}

    res = cur.execute("SELECT * FROM kkidb_cat")
    cats = res.fetchall()

    res = cur.execute("SELECT * FROM kkidb_catems")
    ems = res.fetchall()

    res = cur.execute("SELECT * FROM kkidb_microchip")
    chips = res.fetchall()

    res = cur.execute("SELECT * FROM kkidb_neuter")
    neuter = res.fetchall()


    for (id, name, reg_full, reg_nr, birth_date, reg_date, isMale, cattery_id, dam_id, sire_id, country, organization_id, registration_class) in cats:

        c = Cat(
            name = name,
            registration_class = registration_class,
            country = country,
            birth_date = birth_date,
            isMale = isMale,
        )
        c.save()
        r = Registry(
            cat = c,
            organization = Organization.objects.get(country = "ISL"),
            registry_date = reg_date if reg_date else birth_date,
            registry_number = reg_nr,
            active = True,
        )
        r.save()
        db["Cat"][id] = c
    
    for (id, name, reg_full, reg_nr, birth_date, reg_date, isMale, cattery_id, dam_id, sire_id, country, organization_id, registration_class) in cats:
        c = db["Cat"][id]
        if sire_id and sire_id in db["Cat"]:
            c.sire = db["Cat"][sire_id]
        if dam_id and dam_id in db["Cat"]:
            c.dam = db["Cat"][dam_id]
        
    for (id, date, cat_id, ems_id) in ems:
        if cat_id in db["Cat"] and ems_id in db["EMS"]:
            c = Catcolor(
                date = date,
                cat = db["Cat"][cat_id],
                ems = db["EMS"][ems_id]
            )
            c.save()

    for (id, microchip, cat_id) in chips:
        if cat_id in db["Cat"]:
            c = Microchip(
                cat = db["Cat"][cat_id],
                microchip = microchip
            )
            c.save()
    for (cat_id, date) in neuter:
        if cat_id in db["Cat"]:
            c = db["Cat"][cat_id]
            c.neuter = date
            c.save()

    for cattery in Cattery.objects.all():
        cats = Cat.objects.filter(name__icontains = cattery.name)
        for cat in cats:
            if cat.cattery:
                competitor = cat.cattery
                if len(cattery.name) < len(competitor.name):
                    continue
            cat.cattery = cattery
            cat.save()

    print("Cat Migration Complete")
    return db

from Catteries.models import Cattery
def Catteries(cur, db):
    print("Migrating Catteries App")
    db["Cattery"] = {}
    db["CatteryOwner"] = {}
    res = cur.execute("SELECT * FROM kkidb_cattery")
    catteries = res.fetchall()

    for (id, registry_date, name, country, prefix, email, address, city, postcode, website, phone, organization_id) in catteries:
        c = Cattery(
            registry_date = registry_date, 
            name = name,
            country = "ISL",
            prefix = prefix,
            email = email,
            address = address,
            city = city,
            postcode = postcode,
            website = website,
            phone = phone,
            organization = Organization.objects.get(country = "ISL")
        )
        c.save()
        db["Cattery"][id] = c

    return db

from Membership.models import Member
def Membership(cur, db):
    print("Migrating Members App")
    db["Member"] = {}
    
    res = cur.execute("SELECT * FROM kkidb_member")
    memb = res.fetchall()
    for (id, person_id) in memb:
        m = Member(
            person = db["Person"][person_id],
            active = True,
        )
        m.save()
        db["Member"][id] = m
    print("Members Migration Complete")
    return db

from Organizations.models import Organization
def Organizations(cur, db):
    print("Migrating Organizations App")
    db["Organization"] = {}
    res = cur.execute("SELECT * FROM kkidb_organization")
    orgs = res.fetchall()

    for (id, name, short, country) in orgs:
        org = Organization(
            name = name,
            short = short,
            country = coco.convert(country, to='ISO3', not_found=None) 
        )
        org.save()
        db["Organization"][id] = org
    print("Organization Migration Complete")
    return db 

def Ownerships(cur, db):
    return db

from People.models import Person
def People(cur, db):
    print("Migrating Person")
    
    db["Person"] = {}
    res = cur.execute("SELECT * FROM kkidb_person")
    persons = res.fetchall()    
    
    for (id, name, ssn, address, city, postcode, country, phoneNumber, comment, email, account_id) in persons:
        p = Person(
            name = name,
            ssn = ssn,
            address = address,
            city = city,
            postcode = postcode,
            country = country,
            phoneNumber = phoneNumber,
            comment = comment,
            email = email,
        )
        p.save()
        db["Person"][id] = p

    print("Person Migration Complete")
    return db

from Shows.models import Show, Entry, Judge, Judgement,Litter,Nomination,CatCertification
def Shows(cur, db):
    print("Migrating Show App")
    db["Show"] = {}
    db["Judge"] = {}
    db["Judgement"] = {}
    db["ShowJudge"] = {}
    db["Entry"] = {}
      
    res = cur.execute("SELECT * FROM kkidb_show")
    shows = res.fetchall()     

    
    res = cur.execute("SELECT * FROM kkidb_show")
    shows = res.fetchall()      
    res = cur.execute("SELECT * FROM kkidb_judge")
    judges = res.fetchall() 

    for (id, person_id) in judges:
        db["Judge"][id] = person_id
        

    for (id, name, date, location, visibleToPublic, openForRegistration, organizer_id, international) in shows:
        s = Show(
            name = name,
            organizer = db["Person"][organizer_id],
            date = date,
            location = location,
            visibleToPublic = visibleToPublic,
            openForRegistration = openForRegistration,
        )
        s.save()

        res = cur.execute("SELECT * FROM kkidb_entry where show_id = "+str(id))
        entries = res.fetchall()
        for (entry_id, catalog_nr, guest, cat_id, show_id) in entries:
            e = Entry(
                cat = db["Cat"][cat_id],
                show = s,
                catalog_nr = catalog_nr,
                guest = guest
            )
            e.save()
            db["Entry"][entry_id] = e
        
        res = cur.execute("SELECT * FROM kkidb_showjudges where show_id = "+str(id))
        showJudges = res.fetchall()

        for (id, judge_id, show_id) in showJudges:
            pid = db["Judge"][judge_id]
            s.judges.add(db["Person"][pid])
        s.save()

            
    res = cur.execute("SELECT * FROM kkidb_judgement")
    judgement = res.fetchall()   

    for (entry_id, judgement, biv, abs, comment, judge_id) in judgement:
        judge = None
        if judge_id and len(s.judges.filter(id = db["Judge"][judge_id])) > 0:
            judge = s.judges.get(id = db["Judge"][judge_id])
        if not entry_id in db["Entry"]:
            print(entry_id)
            continue
        j = Judgement.objects.get(entry = db["Entry"][entry_id]) 
        j.judgement = judgement
        j.biv = biv if biv else False
        j.abs = abs if abs else False
        j.comment = comment,
        j.judge = judge
        j.save()
        db["Judgement"][entry_id] = j

    res = cur.execute("SELECT * FROM kkidb_nomination")
    noms = res.fetchall()      

    for (id, bis, award_id, entry_id, judge_id) in noms:
            n = Nomination(
                won = bis,
                award = db["Award"][award_id],
                judgement = Judgement.objects.get(entry = db["Entry"][entry_id])
            )
            n.save()

    res = cur.execute("SELECT * FROM kkidb_catcert")
    certs = res.fetchall()   

    for (id, ems, cat_id, cert_id, judgement_id) in certs: 
        cert = CatCertification(
            cat = db["Cat"][cat_id],
            certification = db["Cert"][cert_id],
            date = db["Judgement"][judgement_id].entry.show.date if judgement_id else None,
            judgement = db["Judgement"][judgement_id] if judgement_id else None,
            ems = EMS.findByString(ems)
        )
        cert.save()
    print("Show Migration Complete")
    return db