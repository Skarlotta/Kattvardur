
from Organizations.models import Organization
from django.contrib import admin

class OrganizationAdmin(admin.ModelAdmin):
    search_fields=['name','country']
admin.site.register(Organization, OrganizationAdmin)