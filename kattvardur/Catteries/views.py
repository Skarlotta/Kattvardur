from django.shortcuts import render
from Catteries.models import Cattery
from Catteries.serializers import CatterySerializer

from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import filters
from rest_framework.decorators import action
from rest_framework.response import Response

class CatteryViewSet(viewsets.ModelViewSet):
    queryset = Cattery.objects.all().order_by('name')
    serializer_class = CatterySerializer
    permission_classes = []
    
    filter_backends = [filters.SearchFilter]
    search_fields =[
            'name', 
            'country', 
            'organization__name',
            'email',
            'address',
            'city',
            'postcode',
            'website',
            'phone'
        ]