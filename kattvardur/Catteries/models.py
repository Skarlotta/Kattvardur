from django.db import models
from Organizations.models import Organization
from People.models import Person

class Cattery(models.Model):
	id = models.AutoField(primary_key = True)
	registry_date = models.DateField(null = True)
	name = models.CharField(max_length = 50, unique=True)
	country = models.CharField(max_length = 3,null=True, blank=True)
	prefix = models.BooleanField()
	organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
	email = models.EmailField(null=True, blank=True)
	address = models.CharField(max_length = 50, null=True, blank=True)
	city = models.CharField(max_length = 50, null=True, blank=True)
	postcode = models.CharField(max_length = 10, null=True, blank=True)
	website = models.CharField(max_length = 1024, null=True, blank=True)
	phone = models.CharField(max_length = 50, null=True, blank=True)
	def __str__(self):
		return self.name + (" - " + self.organization.short if self.organization else "")
	
	class Meta:
		indexes = [
            models.Index(fields=['name']),
        ]


class CatteryOwner(models.Model):
    cattery = models.ForeignKey(Cattery, on_delete=models.CASCADE)
    owner = models.OneToOneField(Person,on_delete=models.CASCADE) 
    current = models.BooleanField(default = True)
    time = models.DateField(null = True)
    def __str__(self):
        return self.cattery.name + " - " +  self.owner.name
