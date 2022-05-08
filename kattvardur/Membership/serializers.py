from rest_framework import serializers
from Membership.models import Member, Payment
from People.serializers import PersonSerializer


class MemberSerializer(serializers.ModelSerializer):
    person = PersonSerializer()
    class Meta:
        model = Member
        fields = ['id',  'person', 'active', 'joined']


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'gift', 'comment', 'method', 'payer', 'uri', 'members', 'date']