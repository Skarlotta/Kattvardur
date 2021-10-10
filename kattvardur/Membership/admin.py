from django.contrib import admin
from Membership.models import Payment, Member

class MemberAdmin(admin.ModelAdmin):
    exclude = ('id',)
    pass
admin.site.register(Member, MemberAdmin)


class PaymentAdmin(admin.ModelAdmin):    
    exclude = ('uri',)
    pass
admin.site.register(Payment, PaymentAdmin) 