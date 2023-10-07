# -*- coding: utf-8 -*-
import csv
import os
from django.core.management.base import BaseCommand, CommandError
from django.utils import timezone
from django.db import connection
from django.core.exceptions import ObjectDoesNotExist
from datetime import datetime
from datetime import date
from django.db import transaction
from Cats.models import Cat
from Shows.models import Entry, Show

class Command(BaseCommand):
	def add_arguments(self, parser):
		parser.add_argument('File', nargs='+', type=str)
		parser.add_argument('show_id', nargs='+', type=str)
	@transaction.atomic
	def handle(self, *args, **options):
		print("started better")
		file = options['File'][0]
		sid = options['show_id'][0]

		with open(file, 'rt') as csvfile:
			spamreader = csv.reader(csvfile, quotechar='"',delimiter = ",")
			print("loaded")
			for row in spamreader:
				if row[0] != "":
					pCheck = Cat.getByRegnr(row[1])
					if(pCheck):
						a = [sid]
						for show_id in a:
							if Entry.objects.filter(show_id = show_id, catalog_nr = row[0]).count() > 0:
								print("skipping "+str(row[0]))
								continue
							e = Entry()
							e.show = Show.objects.get(id = show_id)
							e.cat = pCheck
							e.catalog_nr = row[0]
							e.guest = False
							e.save()
					else:
						print(len(pCheck),row[0], "err")
		csvfile.close()
