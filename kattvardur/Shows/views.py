from Shows.models import Show, Entry, Judgement, Judge
from Shows.serializers import ShowSerializer, ShortEntrySerializer, JudgementSerializer, JudgeSerializer
from rest_framework import viewsets
from rest_framework import permissions
import django_filters.rest_framework
from rest_framework.response import Response
import json

from rest_framework import filters

class ShowViewSet(viewsets.ModelViewSet):
    queryset = Show.objects.all().order_by('date')
    serializer_class = ShowSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field='id'

class ShowOverview(viewsets.ViewSet):
    def list(self, request, *args, **kwargs):
        sid = kwargs['sid']
        show = Show.objects.filter(id = sid)
        if(len(show) == 1):
            return Response(show[0].overview())
        else:
            return Response(status=404)


class EntryViewSet(viewsets.ModelViewSet):
    queryset = Entry.objects.all()
    serializer_class = ShortEntrySerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field='catalog_nr'

    def list(self, request, *args, **kwargs):
        sid = kwargs['sid']
        query = Entry.objects.filter(show__id = sid)
        data = ShortEntrySerializer(query, many=True)
        return Response(data.data)    
    
    def retrieve(self, request,catalog_nr, *args, **kwargs):
        sid = kwargs['sid']
        query = Entry.objects.get(show__id = sid, catalog_nr=catalog_nr)
        data = ShortEntrySerializer(query, many=False)
        return Response(data.data)
    
    
class JudgeViewset(viewsets.ModelViewSet):
    queryset = Judge.objects.all()
    serializer_class = JudgementSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field='id'

    def list(self, request, *args, **kwargs):
        sid = kwargs['sid']
        j = Judge.objects.filter(show_id = sid)
        serializer = JudgeSerializer(j, many=True)
        return Response(serializer.data)


class JudgementViewSet(viewsets.ModelViewSet):
    queryset = Judgement.objects.all()
    serializer_class = JudgementSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field='catalog_nr'

    def list(self, request, *args, **kwargs):
        return Response([])

    def retrieve(self, request, catalog_nr, *args, **kwargs):
        sid = kwargs['sid']
        judgement = Judgement.objects.get(entry__show_id = sid, entry__catalog_nr = catalog_nr)
        serializer = JudgementSerializer(judgement)
        return Response(serializer.data)
    
    def partial_update(self, request, catalog_nr, *args, **kwargs):
        sid = kwargs['sid']
        judgement = Judgement.objects.get(entry__show_id = sid, entry__catalog_nr = catalog_nr)
        dat = request.body.decode('utf8').replace("'", '"')
        serialize = JudgementSerializer(json.loads(dat), partial=True)
        print(json.loads(dat))
        serialize.update(judgement, serialize.data)
        return Response(serialize.data)