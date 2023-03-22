from django.db import models
from django.db.models.deletion import SET_NULL

from Catteries.models import Cattery
from Organizations.models import Organization
from Breeds.models import EMS
from django.utils.timezone import now


class Cat(models.Model):
    id = models.AutoField(primary_key = True)
    name = models.CharField(max_length = 50)
    country = models.CharField(max_length = 4, null = True, default = "", blank=True)
    birth_date = models.DateField(null = True, blank=True)
    isMale = models.BooleanField()
    dam = models.ForeignKey('Cat',related_name='dam_children',null=True, blank=True, on_delete=models.PROTECT)
    sire = models.ForeignKey('Cat',related_name='sire_children', null=True, blank=True,on_delete=models.PROTECT)
    cattery = models.ForeignKey(Cattery,null=True, blank=True, on_delete=models.CASCADE)
    isNeutered = models.BooleanField(default=False)
    neuterDate = models.DateField(null=True, blank=True)
    comment = models.TextField(default = "", blank = True)
    off_registry = models.BooleanField(default=False)

    class Meta:
        indexes = [
            models.Index(fields=['id']),
            models.Index(fields=['birth_date']),
            models.Index(fields=['sire']),
            models.Index(fields=['dam']),
        ]

    @property
    def curr_ems(self):
        colors = self.catcolor_set
        if(colors.count() > 0):
            return colors.latest('date').ems
        else:
            return None
    
    @property
    def curr_phenotype(self):
        colors = self.phenotypecolor_set
        if(colors.count() > 0):
            return colors.latest('date').ems
        else:
            return None

    @property
    def registry_number(self):
        registry = self.registry_set
        if(registry.count() > 0):
            return registry.latest('registry_date').registry_string()
        else:
            return "[N/A]"
    @property
    def colorString(self):
        _ems = self.curr_ems
        _pheno = self.curr_phenotype
        return (str(_ems) if _ems else "[N/A]") + ((" [" + _pheno +"]") if _pheno else "")

    def __str__(self):
        if self.cattery:
            pre = self.registry_number + " - " + self.cattery.name + " " + self.name + " ("+ self.colorString+")"
            post = self.registry_number + " - " + self.name + " " +self.cattery.name + " " + " (" + self.colorString+")"
            return pre if self.cattery.prefix else post
        else:
            return self.registry_number + " - " + self.name + " " + "("+self.colorString+")"

class Catcolor(models.Model):
    date = models.DateField(default=now, null = True, blank = True)
    cat = models.ForeignKey(Cat, on_delete=models.CASCADE)
    ems = models.ForeignKey(EMS, on_delete=models.CASCADE)

class PhenotypeColor(models.Model):
    date = models.DateField(default=now,  null = True, blank = True)
    cat = models.ForeignKey(Cat, on_delete=models.CASCADE)
    ems = models.ForeignKey(EMS, on_delete=models.CASCADE)


class Registry(models.Model):
    cat = models.ForeignKey(Cat, on_delete=models.CASCADE)
    organization = models.ForeignKey(Organization, null=True, blank=True,  on_delete = models.CASCADE)
    registration_class = models.CharField(max_length = 3, null = True, blank=True)
    registry_date = models.DateField(null = True, blank = True)
    registry_number = models.CharField(max_length = 32)    
    active = models.BooleanField(default=True)
    imported = models.BooleanField(default=False)
    manual_entry = models.BooleanField(default = False)
    class Meta:
        indexes = [
            models.Index(fields=['cat']),
        ]
    def __str__(self):
        return self.registry_string() + " - " + self.cat.name

    def registry_string(self):
        if(self.manual_entry):
            return self.registry_number
        rClass = " " + self.registration_class + " " if self.registration_class else " "
        return self.organization.country + " " + self.organization.short + rClass+ self.registry_number

class Microchip(models.Model):
	cat = models.ForeignKey(Cat,on_delete=models.CASCADE)
	microchip = models.CharField(max_length = 30, primary_key=True)  
def __str__(self):
    return self.microchip + " - " + str(self.cat)  
