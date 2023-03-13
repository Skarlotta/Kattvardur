from django.db import models
from django.db.models.deletion import SET_NULL

from Catteries.models import Cattery
from Organizations.models import Organization
from Breeds.models import EMS

class Cat(models.Model):
    id = models.AutoField(primary_key = True)
    name = models.CharField(max_length = 50)
    registration_class = models.CharField(max_length = 3, null = False, default = "REG", blank=True)
    country = models.CharField(max_length = 3, null = True, default = "", blank=True)
    birth_date = models.DateField(null = True, blank=True)
    isMale = models.BooleanField()
    dam = models.ForeignKey('Cat',related_name='dam_children',null=True, blank=True, on_delete=models.PROTECT)
    sire = models.ForeignKey('Cat',related_name='sire_children', null=True, blank=True,on_delete=models.PROTECT)
    cattery = models.ForeignKey(Cattery,null=True, blank=True, on_delete=models.CASCADE)
    neuter = models.DateField(null=True, blank=True)

    class Meta:
        indexes = [
            models.Index(fields=['id']),
            models.Index(fields=['birth_date']),
            models.Index(fields=['sire']),
            models.Index(fields=['dam']),
        ]

    @property
    def registry_number(self):
        registry = self.registry_set
        if(registry.count() > 0):
            return registry.latest('registry_date').registry_number
        else:
            return "[N/A]"

    def __str__(self):
        if self.cattery:
            pre = self.registry_number + " - " + self.cattery.name + " " + self.name 
            post = self.registry_number + " - " + self.name + " " +self.cattery.name + " "
            return pre if self.cattery.prefix else post
        else:
            return self.registry_number + " - " + self.name 

class Catcolor(models.Model):
    date = models.DateField(auto_now=True)
    cat = models.ForeignKey(Cat, on_delete=models.CASCADE)
    ems = models.ForeignKey(EMS, on_delete=models.CASCADE)


class Registry(models.Model):
    cat = models.ForeignKey(Cat, on_delete=models.CASCADE)
    organization = models.ForeignKey(Organization, on_delete = models.CASCADE)
    registry_date = models.DateField(null = True)
    registry_number = models.CharField(max_length = 20)
    active = models.BooleanField(default=True)
    imported = models.BooleanField(default=False)
    class Meta:
        indexes = [
            models.Index(fields=['cat']),
        ]
    def __str__(self):
        return self.organization.short + " " + self.registry_number + " - " + self.cat.name

    def registry_string(self):
        return self.organization.short + " " +self.cat.registration_class + " "+ self.registry_number

class Microchip(models.Model):
	cat = models.ForeignKey(Cat,on_delete=models.CASCADE)
	microchip = models.CharField(max_length = 30, primary_key=True)  
def __str__(self):
    return self.microchip + " - " + str(self.cat)  
