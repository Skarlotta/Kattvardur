from django.db import models
from People.models import Person
import random
import uuid
from datetime import date

# Create your models here.
class Member(models.Model):
    id = models.CharField(primary_key = True, max_length=10)
    person = models.OneToOneField(Person, on_delete = models.CASCADE)
    active = models.BooleanField(default = True)
    joined = models.DateField(null = True, blank = True)

    def genKey(self):
        d = date(self.joined) if self.joined else date.today()
        n = random.randint(1000,9999) # 4
        y = int(str(d.year)[-2:]) # 2
        h = (y * n) % 10 # 1
        hh = ((y * n) // 7) % 100 # 2
        return str(y) + str(n) + str(h) + str(hh)


    def save(self):
        if not self.id:
            self.id = self.genKey()
            while Member.objects.filter(id = self.id).count() > 0:
                self.id = self.genKey()
        super().save()

    def __str__(self):
        return self.id + " - " + self.person.name
    

    class Meta:
        indexes = [
            models.Index(fields=['id']),
            models.Index(fields=['person']),
        ]

class Payment(models.Model):   
    id = models.CharField(primary_key = True, max_length = 7, null = False, unique= True)
    gift = models.BooleanField(default = False)
    comment = models.TextField(null=True, blank=True)
    method = models.CharField(max_length=128)
    payer = models.ForeignKey(Member, on_delete=models.CASCADE, related_name='paid')
    members = models.ManyToManyField(Member)
    date = models.DateField(auto_now=True)

    def save(self):
        if not self.id:
            self.uri = uuid.uuid4().hex[:7]
            while Payment.objects.filter(uri = self.uri):
                self.uri= uuid.uuid4().hex[:7]
        super().save()

    def __str__(self):
        return self.id + " - " + self.payer.person.name + " ("+ str(self.date)+")"



