
from Catteries.models import Cattery, CatteryOwner
from django.contrib import admin

class CatteryAdmin(admin.ModelAdmin):
    pass
admin.site.register(Cattery, CatteryAdmin)


class CatteryOwnerAdmin(admin.ModelAdmin):
    pass
admin.site.register(CatteryOwner, CatteryOwnerAdmin)