from Membership.models import Member, Payment
from Membership.serializers import MemberSerializer, PaymentSerializer
from rest_framework import viewsets
from rest_framework import permissions

class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all().order_by('name')
    serializer_class = MemberSerializer
    permission_classes = [permissions.IsAuthenticated]

class PaymentSerializerViewSet(viewsets.ModelViewSet):
    queryset = PaymentSerializer.objects.all().order_by('name')
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]