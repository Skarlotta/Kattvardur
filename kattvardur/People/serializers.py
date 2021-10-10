from rest_framework import serializers
from People.models import Person


class PersonSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Person
        fields = ['id', 'name', 'ssn', 'address', 'city', 'postcode', 'country', 'phoneNumber' ,'comment', 'email']