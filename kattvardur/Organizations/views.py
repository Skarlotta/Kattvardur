from Organizations.models import Organization
from Organizations.serialization import OrganizationSerializer
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import filters


class OrganizationViewSet(viewsets.ModelViewSet):
    queryset = Organization.objects.all().order_by('name')
    serializer_class = OrganizationSerializer
    permission_classes = [permissions.IsAuthenticated]
        
    filter_backends = [filters.SearchFilter]
    search_fields = ['short','name', 'country']