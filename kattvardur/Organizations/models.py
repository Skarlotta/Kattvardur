from django.db import models

# Create your models here.
class Organization(models.Model):
    id = models.AutoField(primary_key = True)
    name = models.CharField(max_length = 100, unique=True)
    short = models.CharField(max_length = 15, null=True)
    country = models.CharField(max_length = 3) 

    def __str__(self):
        return self.name + " (" + self.short +")"