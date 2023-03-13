from django.contrib import admin
from Cats.models import Cat, Registry, Microchip, Catcolor
from Shows.models import CatCertification


class RegistryInline(admin.TabularInline):
    autocomplete_fields = ['organization']
    model = Registry
    
class MicrochipInline(admin.TabularInline):
    model = Microchip

class CatColorInline(admin.TabularInline):
    autocomplete_fields = ['ems']
    model = Catcolor

class CertInline(admin.TabularInline):
    model = CatCertification
    readonly_fields=['judgement']
    autocomplete_fields=['ems']

class CatAdmin(admin.ModelAdmin):    
    inlines = [
        RegistryInline,
        MicrochipInline,
        CatColorInline,
        CertInline,
    ]
    search_fields = ['cattery__name', 'name', 'registry__registry_number']
    autocomplete_fields = ['dam', 'sire', 'cattery']

admin.site.register(Cat, CatAdmin)


class RegistryAdmin(admin.ModelAdmin):
    autocomplete_fields = ['organization']
admin.site.register(Registry, RegistryAdmin)

class CatColorAdmin(admin.ModelAdmin):
    autocomplete_fields = ['ems']
admin.site.register(Catcolor, CatColorAdmin)


class MicrochipAdmin(admin.ModelAdmin):
    pass
admin.site.register(Microchip, MicrochipAdmin)

