from Membership.models import Member, Payment
from Membership.serializers import MemberSerializer, PaymentSerializer
from rest_framework import viewsets
from rest_framework import permissions
import django_filters
from rest_framework import filters

class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = [
        'id',
        'person__name',
        'person__ssn',
        'person__address',
        'person__city',
        'person__country',
        'person__phoneNumber',
        'person__email',
        'joined']
    search_fields = filterset_fields

class PaymentSerializerViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]