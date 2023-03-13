
from Shows.models import Show, Entry, Judge, Judgement, Litter, Nomination, CatCertification
from django.contrib import admin
from django.forms import ModelForm
from django.urls import reverse
from django.utils.safestring import mark_safe


class JudgeAdminInline(admin.TabularInline):
    model = Judge
    extra = 1

class JudgementAdminForm(ModelForm):
    pass

class NominationInline(admin.TabularInline):
    model = Nomination
    extra = 2

class CatcertInline(admin.TabularInline):
    autocomplete_fields = ['cat', 'ems']
    model = CatCertification


class JudgementAdmin(admin.ModelAdmin):
    form = JudgementAdminForm
    model = Judgement
    inlines = (NominationInline, CatcertInline)
admin.site.register(Judgement, JudgementAdmin)

class LitterAdmin(admin.TabularInline):
    model = Litter
    list_display=('judgementLink')
    readonly_fields = ('judgement_Link',)
    exclude = ('judgement',)        
    
    def judgement_Link(self, obj):
        return mark_safe('<a href="/admin/Shows/judgement/{}/change">{}</a>'.format(obj.judgement.pk,
            str(obj.judgement)
        ))
    extra = 1
    pass

class EntryAdminInline(admin.TabularInline):
    model = Entry
    extra = 1
    list_display=('judgement_Link')
    readonly_fields = ('judgement_Link',)
    exclude = ('judgement',)    
    ordering=['catalog_nr']

    autocomplete_fields = ['cat']
    
    def judgement_Link(self, obj):
        return mark_safe('<a href="/admin/Shows/judgement/{}/change">{}</a>'.format(obj.judgement.pk,
            str(obj.judgement)
        ))
    
class ShowAdmin(admin.ModelAdmin):
    inlines = (JudgeAdminInline, EntryAdminInline, LitterAdmin)
admin.site.register(Show, ShowAdmin)

class CatCertAdmin(admin.ModelAdmin):
    readonly_fields=['judgement']
    search_fields = ['ems', 'cat']
    autocomplete_fields = ['ems', 'cat']
admin.site.register(CatCertification, CatCertAdmin)
