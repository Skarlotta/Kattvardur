from django.db import models
from django.db.models import Q

class Award(models.Model):
	name = models.CharField(max_length = 50)
	default = models.BooleanField(default = False)
	category = models.CharField(max_length = 50, null = True)

	def __str__(self):
		return self.name + " ("+self.category if self.category else "" +")"

class Title(models.Model):
	fullName = models.CharField(max_length = 50)
	name = models.CharField(max_length = 3)
	description = models.TextField()

	def __str__(self):
		return self.name

class Certification(models.Model):
	name = models.CharField(max_length = 7)
	ranking = models.IntegerField()
	next = models.ForeignKey("Certification", related_name="next_certification", null=True,blank=True, on_delete=models.SET_NULL)
	title = models.OneToOneField(Title, null = True,blank=True, on_delete=models.SET_NULL)
	certclass = models.IntegerField()

	@property
	def absoluteRank(self):
		if(self.name == "HP"):
			return 100 * 15
		return 100 * (12 - self.certclass) + self.ranking

	@property
	def previous(self):
		return Certification.objects.get(Q(next = self) & ~Q(ranking = self.ranking)) if Certification.objects.filter(Q(next = self) & ~Q(ranking = self.ranking)).exists() else None
	
	def __str__(self):
		return self.name  +" "+ str(self.ranking) + " " + ("("+str(self.title)+")" if self.title else "") + ((" Previous : " + Certification.objects.get(Q(next = self) & ~Q(name = self.name)).name) if Certification.objects.filter(Q(next = self) & ~Q(name = self.name)).exists() else "")