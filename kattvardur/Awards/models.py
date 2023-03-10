from django.db import models

class Award(models.Model):
	name = models.CharField(max_length = 50)
	default = models.BooleanField(default = False)
	category = models.CharField(max_length = 50, null = True)

	def __str__(self):
		return self.name + " ("+self.category+")"

class Title(models.Model):
	fullName = models.CharField(max_length = 50)
	name = models.CharField(max_length = 3)
	description = models.TextField()

	def __str__(self):
		return self.name

class Certification(models.Model):
	name = models.CharField(max_length = 7)
	ranking = models.IntegerField()
	previous = models.ForeignKey("Certification", related_name ="previous_cert", null=True, blank=True, on_delete=models.SET_NULL)
	next = models.ForeignKey("Certification", related_name="next_certification", null=True,blank=True, on_delete=models.SET_NULL)
	title = models.OneToOneField(Title, null = True,blank=True, on_delete=models.SET_NULL)

	def __str__(self):
		return self.name  +" "+ str(self.ranking) + " " + ("("+str(self.title)+")" if self.title else "")
