from django.contrib import admin
from Breeds.models import EMS, Breed, Color


class EMSAdmin(admin.ModelAdmin):
    search_fields=['breed__breed', 'breed__short', 'color__color', 'color__short']
    autocomplete_fields = ["breed", "color"]
admin.site.register(EMS, EMSAdmin)

class BreedAdmin(admin.ModelAdmin):
    search_fields=['short', 'breed']
    pass
admin.site.register(Breed, BreedAdmin)

class ColorAdmin(admin.ModelAdmin):
    search_fields=['color', 'short']
admin.site.register(Color, ColorAdmin)
