from django.db import models
from django.db.models.fields.related import ForeignKey, ManyToManyField, OneToOneField
from Cats.models import Cat
from People.models import Person
from Awards.models import Award

class Entry(models.Model):
    id = models.AutoField(primary_key=True)
    cat = models.ForeignKey(Cat,on_delete=models.CASCADE)
    show = models.ForeignKey("Show",on_delete=models.CASCADE)
    catalog_nr = models.IntegerField()
    guest = models.BooleanField() 	
    judgement = OneToOneField("Judgement", null=True, blank = True, on_delete=models.SET_NULL)
    class Meta:
        unique_together = ('show', 'cat')
        unique_together = ('show', 'catalog_nr')

    def __str__(self):
        return str(self.catalog_nr) + " - " + self.cat.name + " @ " + self.show.name

    def save(self):
        if not self.judgement:
            j = Judgement()
            j.save()
            self.judgement = j
        super().save()


class Judge(models.Model):
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    show = models.ForeignKey("Show", on_delete=models.CASCADE)
    def __str__(self):
        return self.person.name + " @ " + self.show.name

class Show(models.Model):
    name = models.CharField(max_length = 51)
    organizer = models.ForeignKey(Person, related_name='organized', on_delete=models.CASCADE)
    date = models.DateField()
    location = models.CharField(max_length = 50, null=True)
    visibleToPublic = models.BooleanField(default = True)
    openForRegistration = models.BooleanField(default = False)
    international = models.BooleanField(default = True)
    judges = models.ManyToManyField(Person, related_name='judged', through = Judge)
    entries = models.ManyToManyField(Cat, through=Entry)
    awards = models.ManyToManyField(Award)
    def __str__(self):
        return self.name + ". " + str(self.date)

class Judgement(models.Model):
    judge = models.ForeignKey(Judge, null=True, on_delete=models.CASCADE)
    judgement = models.CharField(max_length = 10, default = "", blank=True) #EX1
    biv = models.BooleanField(default = False)
    abs = models.BooleanField(default = False)
    comment = models.CharField(max_length = 2048, default = "", blank=True)
    nominations = models.ManyToManyField(Award, through="Nomination")
    def __str__(self):
        if hasattr(self, 'litter'):
            return "Litter " + str(self.litter) 
            
        if hasattr(self, 'entry'):
            return "Entry " + str(self.entry) 

    @property
    def entrant(self):        
        if hasattr(self, 'litter'):
            return self.litter
            
        if hasattr(self, 'entry'):
            return self.entry
        return None

class Litter(models.Model):
    class Meta:
        unique_together = ('show', 'catalog')
    catalog = models.CharField(max_length = 3)
    show = models.ForeignKey('Show',on_delete=models.CASCADE)
    judgement = OneToOneField("Judgement", null=True, blank = True, on_delete=models.SET_NULL)
    entries = ManyToManyField(Entry)
    def __str__(self):
        return self.catalog + " @ " + self.show.name

    def save(self):
        if not self.judgement:
            j = Judgement()
            j.save()
            self.judgement = j
        super().save()

class Nomination(models.Model):
    judgement = models.ForeignKey(Judgement, on_delete=models.CASCADE)
    award = models.ForeignKey(Award, on_delete=models.CASCADE)
    won = models.BooleanField(default = False)

    def __str__(self):
        return "Nom " + str(self.award) + " <> " + str(self.judgement)