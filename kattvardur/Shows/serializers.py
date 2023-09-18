from rest_framework import serializers
from Shows.models import Show
from People.serializers import PersonSerializer

class ShowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Show
        fields = ['id', 'name', 'organizer', 'date', 'location', 'openForRegistration', 'international', 'judges']