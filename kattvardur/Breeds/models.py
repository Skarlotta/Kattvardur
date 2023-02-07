from django.db import models
from django.core.exceptions import ObjectDoesNotExist

class Breed(models.Model):
    breed = models.CharField(max_length = 25, unique=True)
    category = models.IntegerField()
    short = models.CharField(max_length = 5,unique = True)
    def __str__(self):
        return self.short 

class Color(models.Model):
    color = models.CharField(max_length=50, unique = True)
    short = models.CharField(max_length=20, unique = True)
    desc = models.CharField(max_length=1024)
    def __str__(self):
        return self.color + " " + self.short

class EMS(models.Model):
    breed = models.ForeignKey('Breed',on_delete=models.CASCADE)
    color = models.ForeignKey('Color',on_delete=models.CASCADE)
    group = models.IntegerField(null = True)
        

    def __str__(self):
        return self.breed.short + " " + self.color.short