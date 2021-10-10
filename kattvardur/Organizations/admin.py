
from Organizations.models import Organization
from django.contrib import admin

class OrganizationAdmin(admin.ModelAdmin):
    pass
admin.site.register(Organization, OrganizationAdmin)