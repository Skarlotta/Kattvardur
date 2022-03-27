from People.models import Person
from People.serializers import PersonSerializer
from rest_framework import viewsets
from rest_framework import permissions
import django_filters.rest_framework

from rest_framework import filters

class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all().order_by('name')
    serializer_class = PersonSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ['ssn']