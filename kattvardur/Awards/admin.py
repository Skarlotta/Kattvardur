from django.contrib import admin
from Awards.models import Award, Certification, Title

# Register your models here.
admin.site.register(Award)
admin.site.register(Certification)
admin.site.register(Title)