from django.db import models

class Award(models.Model):
	name = models.CharField(max_length = 50)
	default = models.BooleanField(default = False)
	category = models.CharField(max_length = 50, null = True)
	ranking = models.IntegerField(default = 0)

	def __str__(self):
		return self.name + " ("+self.category+")"