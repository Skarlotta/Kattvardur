from django.db import models
from People.models import Person
import random
import uuid

# Create your models here.
class Member(models.Model):
    id = models.CharField(primary_key = True, max_length=9)
    person = models.OneToOneField(Person, on_delete = models.CASCADE)
    active = models.BooleanField(default = True)
    joined = models.DateField(null = True, blank = True)

    def save(self):
        if not self.id:
            self.id = "KKI"+str(random.randint(100000,999999))
            while Member.objects.filter(id = self.id).count() > 0:
                self.id = "KKI"+str(random.randint(100000,999999))
        super().save()

    def __str__(self):
        return self.id + " - " + self.person.name

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



