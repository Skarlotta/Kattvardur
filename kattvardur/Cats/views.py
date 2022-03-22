from Cats.models import Cat, Registry
from Cats.serializer import CatSerializer
from People.serializers import PersonSerializer
from People.models import Person
from django.db.models import Max, Q
from Organizations.models import Organization

from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import filters
from rest_framework.decorators import action
from rest_framework.response import Response



class CatViewSet(viewsets.ModelViewSet):
    queryset = Cat.objects.all().order_by('name')
    serializer_class = CatSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'microchip__microchip', 'registry__registry_number','cattery__name','birth_date','catcolor__ems__breed__breed','catcolor__ems__breed__short', 'catcolor__ems__color__color', 'catcolor__ems__color__short']

    @action(detail=False, methods=['get'])
    def regnr(self, request):
        org = Organization.objects.get(country = "ISL")
        regnr = Registry.objects.filter(Organization = org).aggregate(Max('registry_number'))
        nr = int(regnr['registry_number__max']) + 1
        return  Response({'reg_nr': nr})