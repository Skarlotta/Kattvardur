from Shows.models import Show, Entry
from Shows.serializers import ShowSerializer, ShortEntrySerializer
from rest_framework import viewsets
from rest_framework import permissions
import django_filters.rest_framework
from rest_framework.response import Response

from rest_framework import filters

class ShowViewSet(viewsets.ModelViewSet):
    queryset = Show.objects.all().order_by('date')
    serializer_class = ShowSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field='id'


class EntryViewSet(viewsets.ModelViewSet):
    queryset = Entry.objects.all()
    serializer_class = ShortEntrySerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field='id'

    def list(self, request, *args, **kwargs):
        sid = kwargs['sid']
        query = Entry.objects.filter(show__id = sid)
        print("e")
        print(sid)
        print(len(query))
        data = ShortEntrySerializer(query, many=True)
        return Response(data.data)