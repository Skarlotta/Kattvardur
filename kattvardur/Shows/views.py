from Shows.models import Show
from Shows.serializers import ShowSerializer
from rest_framework import viewsets
from rest_framework import permissions
import django_filters.rest_framework

from rest_framework import filters

class ShowViewSet(viewsets.ModelViewSet):
    queryset = Show.objects.all().order_by('date')
    serializer_class = ShowSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field='id'