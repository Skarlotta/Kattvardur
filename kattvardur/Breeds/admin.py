from django.contrib import admin
from Breeds.models import EMS, Breed, Color


class EMSAdmin(admin.ModelAdmin):
    pass
admin.site.register(EMS, EMSAdmin)

class BreedAdmin(admin.ModelAdmin):
    pass
admin.site.register(Breed, BreedAdmin)

class ColorAdmin(admin.ModelAdmin):
    pass
admin.site.register(Color, ColorAdmin)
