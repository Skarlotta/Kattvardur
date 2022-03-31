from rest_framework import serializers
from Cats.models import Cat, Registry, Microchip,Catcolor
from Organizations.models import Organization

class MicrochipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Microchip
        fields = ['microchip']

class EMSField(serializers.Field):

    def to_representation(self, value):
        return str(value)

class CatColorSerializer(serializers.ModelSerializer):
    ems = EMSField()
    class Meta:
        model = Catcolor
        fields = ['date','ems']

class RegistrySerializer(serializers.ModelSerializer):
    registry = serializers.SlugField(
        source = 'registry_string'
    )
    class Meta:
        model = Registry
        fields = ['Organization', 'registry', 'registry_date','registry_number','active','imported']

class CatSerializer(serializers.ModelSerializer):    
    microchips = MicrochipSerializer(many=True, source='microchip_set')
    colors = CatColorSerializer(many=True, source='catcolor_set')
    registries = RegistrySerializer(many=True, source='registry_set')

    class Meta:
        model = Cat        
        dam = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
        sire = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

        cattery = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
        fields = [
            'id', 
            'name',
            'registration_class',
            'country',
            'birth_date',
            'isMale',
            'neuter',
            'dam',
            'sire',
            'cattery', 
            'microchips',
            'colors',
            'registries'
        ]

    def create(self, validated_data):
        print(validated_data)
        chip_data = validated_data.pop('microchip_set')
        cat = Cat.objects.create(**validated_data)
        for cd in chip_data:
            Microchip.objects.create(cat=cat, **cd)
        return cat

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            print(attr,value)
        instance.save()

        return instance