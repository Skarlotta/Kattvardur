from django.contrib import admin
from Cats.models import Cat, Registry, Microchip, Catcolor, PhenotypeColor
from Shows.models import CatCertification


@admin.action(description='Set selected as off-registry cats')
def set_off_registry(modeladmin, request, queryset):
    queryset.update(off_registry = True)
    
class RegistryInline(admin.TabularInline):
    autocomplete_fields = ['organization']
    model = Registry
    
class MicrochipInline(admin.TabularInline):
    model = Microchip
    extra = 1

class CatColorInline(admin.TabularInline):
    autocomplete_fields = ['ems']
    model = Catcolor

class PhenoColorInline(admin.TabularInline):
    autocomplete_fields = ['ems']
    model = PhenotypeColor
    extra=0

class CertInline(admin.TabularInline):
    model = CatCertification
    readonly_fields=['judgement']
    autocomplete_fields=['ems']

class CatAdmin(admin.ModelAdmin):    
    inlines = [
        RegistryInline,
        MicrochipInline,
        CatColorInline,
        PhenoColorInline,
        CertInline,
    ]
    search_fields = ['cattery__name', 'name', 'registry__registry_number']
    autocomplete_fields = ['dam', 'sire', 'cattery']

    actions = [set_off_registry]

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

