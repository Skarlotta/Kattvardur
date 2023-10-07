# -*- coding: utf-8 -*-
import csv
import os
from django.core.management.base import BaseCommand, CommandError
from Cats.models import Cat, Registry
from Organizations.models import Organization
from django.utils import timezone
from django.db import connection
from django.core.exceptions import ObjectDoesNotExist
from datetime import datetime
from datetime import date
from django.db import transaction

class Command(BaseCommand):
	def add_arguments(self, parser):
		parser.add_argument('File', nargs='+', type=str)
		parser.add_argument('EMS', nargs='+', type=str)
	@transaction.atomic
	def handle(self, *args, **options):
		print("emessing")
		ems = {}
		with open(options['EMS'][0], 'rt') as emsfile:
			emsreader = csv.reader(emsfile, quotechar='"',delimiter = ",")
			for row in emsreader:
				ems[row[0]] = row[1]
		print("started better")
		emsfile.close()

		REGNR_ROW = 0
		NAME_ROW = 1
		BIRTHDATE_ROW = 3
		GENDER_ROW = 4
		EMS_ROW = 2
		with open(options['File'][0], 'rt', encoding='latin-1') as csvfile:
			spamreader = csv.reader(csvfile, quotechar='"',delimiter = ",", )
			print("loaded")
			x = 0
			i = 0
			first = True
			for row in spamreader:
				if first:
					first = False
					continue
				i += 1
				if (1 + i)%100 == 0:
					print(i)
				if row[NAME_ROW] != "":
					pCheck = Registry.objects.all().filter(registry_number = row[REGNR_ROW])
					if(len(pCheck) == 0):
						print(row[REGNR_ROW])
						print("NEW")
						c = Cat()
						c.name = row[NAME_ROW]
						reg = Registry()
						reg.cat = c
						reg.registry_number = row[REGNR_ROW]
						reg.organization = Organization.objects.get(short  = "KKÍ")
						if row[BIRTHDATE_ROW] != "":
							bd = datetime.strptime(row[BIRTHDATE_ROW], '%d.%m.%y 00:00')
							c.birth_date = bd
						if row[BIRTHDATE_ROW] != "":
							rd = datetime.strptime(row[BIRTHDATE_ROW], '%d.%m.%y 00:00')
							reg.registry_date = rd
						c.isMale = row[GENDER_ROW] == "Fress"
						c.save()
						reg.save()
						print(c)
						print(reg)
						if row[EMS_ROW] != "":
							try:
								c.ems = ems[row[EMS_ROW]] #Property setter, autosaves
								print(c.ems)
							except Exception as e:
								print("========")
								print(ems[row[EMS_ROW]])
			print(x)

		csvfile.close()
