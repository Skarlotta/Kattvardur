from rest_framework import serializers
from Membership.models import Member, Payment


class MemberSerializer(serializers.PrimaryKeyRelatedField):
    class Meta:
        model = Member
        fields = ['id', 'person', 'active', 'joined']


class PaymentSerializer(serializers.PrimaryKeyRelatedField):
    class Meta:
        model = Payment
        fields = ['id', 'gift', 'comment', 'method', 'payer', 'uri', 'members', 'date']