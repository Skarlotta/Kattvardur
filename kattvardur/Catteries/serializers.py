from rest_framework import serializers
from Catteries.models import Cattery

class CatterySerializer(serializers.ModelSerializer):
    class Meta:
        model = Cattery
        fields = [
            'id',
            'registry_date', 
            'name', 
            'country', 
            'prefix', 
            'organization',
            'email',
            'address',
            'city',
            'postcode',
            'website',
            'phone'
        ]