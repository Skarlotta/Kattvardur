from django.contrib import admin
from Cats.models import Cat, Registry, Microchip


class RegistryInline(admin.TabularInline):
    model = Registry
    
class MicrochipInline(admin.TabularInline):
    model = Microchip

class CatAdmin(admin.ModelAdmin):    
    inlines = [
        RegistryInline,
        MicrochipInline
    ]
admin.site.register(Cat, CatAdmin)


class RegistryAdmin(admin.ModelAdmin):
    pass
admin.site.register(Registry, RegistryAdmin)


class MicrochipAdmin(admin.ModelAdmin):
    pass
admin.site.register(Microchip, MicrochipAdmin)

