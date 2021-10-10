
from Shows.models import Show, Entry, Judge, Judgement, Litter, Nomination
from django.contrib import admin
from django.forms import ModelForm
from django.urls import reverse
from django.utils.safestring import mark_safe


class JudgeAdminInline(admin.TabularInline):
    model = Judge
    extra = 1

class JudgementAdminForm(ModelForm):
    def __init__(self, *args, **kwargs):
        super(JudgementAdminForm, self).__init__(*args, **kwargs)
        inst = kwargs["instance"]
        entrant = inst.entrant
        self.fields['judge'].queryset = Judge.objects.filter(show=entrant.show)

class NominationInline(admin.TabularInline):
    model = Nomination
    extra = 2


class JudgementAdmin(admin.ModelAdmin):
    form = JudgementAdminForm
    model = Judgement
    inlines = (NominationInline,)
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
    
    def judgement_Link(self, obj):
        return mark_safe('<a href="/admin/Shows/judgement/{}/change">{}</a>'.format(obj.judgement.pk,
            str(obj.judgement)
        ))
class ShowAdmin(admin.ModelAdmin):
    inlines = (JudgeAdminInline, EntryAdminInline, LitterAdmin)
admin.site.register(Show, ShowAdmin)
