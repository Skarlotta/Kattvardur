# -*- coding: utf-8 -*-
import csv
import os
from django.core.management.base import BaseCommand, CommandError
from Cats.models import Cat
from django.utils import timezone
from django.db import connection
from django.core.exceptions import ObjectDoesNotExist
from datetime import datetime
from datetime import date
from django.db import transaction

class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument('File', nargs='+', type=str)
    @transaction.atomic
    def handle(self, *args, **options):
        print("started better")
        Length = 1
        with open(options['File'][0], 'rt') as lengthfile:
            spamreader = csv.reader(lengthfile, quotechar='"',delimiter = ",")
            Length = sum(1 for row in spamreader)
            print("Length recorded as " + str(Length))
        lengthfile.close()

        with open(options['File'][0], 'rt') as csvfile:
            spamreader = csv.reader(csvfile, quotechar='"',delimiter = ",")
            print("loaded")
            x = 0
            for row in spamreader:
                if row[0] != "":
                    pCheck = Cat.getByRegnr(row[0])
                    if(pCheck):
                        print("neutered")
                        print(row[0])
                        pCheck.isNeutered = True
                        pCheck.neuterDate = date.today
                    else:
                        print(row[0], "err")
            csvfile.close()
