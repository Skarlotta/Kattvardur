from django.contrib import admin
from Cats.models import Cat, Registry, Microchip, Catcolor


class RegistryInline(admin.TabularInline):
    model = Registry
    
class MicrochipInline(admin.TabularInline):
    model = Microchip

class CatColorInline(admin.TabularInline):
    model = Catcolor

class CatAdmin(admin.ModelAdmin):    
    inlines = [
        RegistryInline,
        MicrochipInline,
        CatColorInline
    ]
admin.site.register(Cat, CatAdmin)


class RegistryAdmin(admin.ModelAdmin):
    pass
admin.site.register(Registry, RegistryAdmin)

class CatColorAdmin(admin.ModelAdmin):
    pass
admin.site.register(Catcolor, CatColorAdmin)


class MicrochipAdmin(admin.ModelAdmin):
    pass
admin.site.register(Microchip, MicrochipAdmin)

