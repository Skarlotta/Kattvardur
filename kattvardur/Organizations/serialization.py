from rest_framework import serializers
from Organizations.models import Organization


class OrganizationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Organization
        fields = ['id', 'name', 'short', 'country']
        