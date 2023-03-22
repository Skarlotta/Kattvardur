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
    group = models.IntegerField(null = True, blank=True)
        
    @staticmethod
    def findByString(ems):
        if ems == None:
            return None
        emsString = ems.split()
        breed = emsString[0]
        color = ' '.join(emsString[1:])
        try:
            b = Breed.objects.get(short = breed)
            c = Color.objects.get(short = color)
            ems = EMS.objects.get(breed = b, color = c)
            return ems
        except Breed.DoesNotExist:
            return None
    def __str__(self):
        return self.breed.short + " " + self.color.short
    

    class Meta:
        indexes = [
            models.Index(fields=['breed']),
        ]
