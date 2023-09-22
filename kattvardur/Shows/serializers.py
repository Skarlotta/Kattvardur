from rest_framework import serializers
from Shows.models import Show, Entry
from Cats.serializer import CatSummarySerializer

class ShowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Show
        fields = ['id', 'name', 'organizer', 'date', 'location', 'openForRegistration', 'international', 'judges']


class ShortEntrySerializer(serializers.ModelSerializer):
    cat_model = CatSummarySerializer(source='cat')
    class Meta:
        model = Entry
        fields = ['id', 'cat_model', 'show', 'catalog_nr', 'guest']