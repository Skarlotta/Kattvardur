from Cats.models import Cat
from Cats.serializer import CatSerializer
from rest_framework import viewsets
from rest_framework import permissions
from People.serializers import PersonSerializer
from People.models import Person
from rest_framework import filters

class CatViewSet(viewsets.ModelViewSet):
    queryset = Cat.objects.all().order_by('name')
    serializer_class = CatSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'microchip__microchip', 'registry__registry_number','cattery__name','birth_date','catcolor__ems__breed__breed','catcolor__ems__breed__short', 'catcolor__ems__color__color', 'catcolor__ems__color__short']