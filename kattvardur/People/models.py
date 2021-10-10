from django.db import models
from django.contrib.auth.models import User
from Organizations.models import Organization 

class Person(models.Model):
	id = models.AutoField(primary_key = True)
	name = models.CharField(max_length = 75)
	ssn = models.CharField(max_length = 10, null = True, unique = True, blank = True)
	address = models.CharField(max_length = 50, null = True, blank = True)
	city = models.CharField(max_length = 50, null = True, blank = True)
	postcode = models.CharField(max_length = 10, null = True, blank = True)
	country = models.CharField(max_length = 3, null = True, blank = True)
	phoneNumber = models.CharField(max_length = 25, null = True, blank = True)
	comment = models.CharField(max_length = 2048, null = True, blank = True)
	email = models.EmailField(null = True, blank = True)
	account = models.OneToOneField(User, null=True, on_delete = models.SET_NULL, blank = True)
	organization = models.ForeignKey(Organization, null=True, blank=True, on_delete=models.SET_NULL) 

	def fullAddress(self):
		str = self.address
		if self.city:
			str += ", " + self.city
		if self.postcode:
			str += " ("+self.postcode+")"
		return str

	def __str__(self):
		return self.name + (" - " +self.ssn if self.ssn else "")