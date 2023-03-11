from rest_framework import serializers
from Cats.models import Cat, Registry, Microchip,Catcolor
from Breeds.models import Breed, Color, EMS
from Organizations.models import Organization
from django.core.exceptions import ObjectDoesNotExist
from django.db.transaction import atomic

class MicrochipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Microchip
        fields = ['microchip']

class EMSField(serializers.Field):
    def to_internal_value(self, data):
        try:
            e = data.split(" ")
            b = Breed.objects.get(short = e[0])
            c = Color.objects.filter(short = " ".join(e[1:]))
            try:
                if(len(c) == 0):
                    c = Color(short = " ".join(e[1:]))
                    c.save()
                else:
                    c = c[0]
                ems = EMS.objects.filter(breed = b, color = c)
                if(len(ems) == 0):
                    ems = EMS(breed = b, color = c)
                    ems.save()
                else:
                    ems = ems[0]
                return ems
            except Exception as ex:
                print(31)
                print(ex)
                return None
        except Exception as ex:
            print(35)
            print(ex)
            return None

    def to_representation(self, value):
        return str(value)

class CatColorSerializer(serializers.ModelSerializer):
    ems = EMSField()
    class Meta:
        model = Catcolor
        fields = ['date','ems']

class RegistrySerializer(serializers.ModelSerializer):
    registry = serializers.SlugField(
        source = 'registry_string',
        read_only = True,
    )
    class Meta:
        model = Registry
        fields = ['organization', 'registry', 'registry_date','registry_number','active','imported']

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

    @atomic
    def create(self, validated_data):
        chip_data = validated_data.pop('microchip_set')
        color_data = validated_data.pop('catcolor_set')
        registry_data = validated_data.pop('registry_set')
        cat = Cat.objects.create(**validated_data)

        for chip in chip_data:
            cat.microchip_set.create(**chip)
        for color in color_data:
            Catcolor.objects.create(cat = cat, **color)
        for registry in registry_data:
            cat.registry_set.create(**registry)

        return cat

    def update(self, instance, validated_data):
        instance.save()

        return instance