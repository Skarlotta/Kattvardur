from Organizations.models import Organization
from Organizations.serialization import OrganizationSerializer
from rest_framework import viewsets
from rest_framework import permissions

class OrganizationViewSet(viewsets.ModelViewSet):
    queryset = Organization.objects.all().order_by('name')
    serializer_class = OrganizationSerializer
    permission_classes = [permissions.IsAuthenticated]