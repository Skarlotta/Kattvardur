from django.shortcuts import render
from rest_framework import viewsets
from Breeds.models import EMS
from Breeds.serializer import EMSSerializer
from rest_framework import permissions
from rest_framework import filters

# Create your views here.
class EMSViewSet(viewsets.ModelViewSet):
    queryset = EMS.objects.all().order_by('breed__breed')
    serializer_class = EMSSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    filter_backends = [filters.SearchFilter]
    search_fields = ['breed__short','color__short']
 
 # Create your views here.
class BreedViewSet(viewsets.ModelViewSet):
    queryset = EMS.objects.all().order_by('breed__breed')
    serializer_class = EMSSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    filter_backends = [filters.SearchFilter]
    search_fields = []
 

 # Create your views here.
class ColorViewSet(viewsets.ModelViewSet):
    queryset = EMS.objects.all().order_by('breed__breed')
    serializer_class = EMSSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    filter_backends = [filters.SearchFilter]
    search_fields = []
 