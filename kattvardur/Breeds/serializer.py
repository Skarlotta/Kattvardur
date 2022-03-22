from rest_framework import serializers
from Breeds.models import Breed, Color, EMS

class Breed(serializers.ModelSerializer):
    class Meta:
        model = Breed
        fields = ['breed','category','short']

class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ['color', 'short','desc']

class EMSSerializer(serializers.ModelSerializer):

    category = serializers.SlugRelatedField(
        many=False,
        read_only=True,
        slug_field='category',
        source='breed'
    )

    ems = serializers.CharField(read_only=True, source = '__str__')
    class Meta:
        model = EMS
        fields = ['breed','color', 'breed','color','ems','category', 'group']