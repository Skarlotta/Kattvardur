from rest_framework import serializers
from Shows.models import Show, Entry, Judgement, Judge
from Cats.serializer import CatSummarySerializer

class ShowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Show
        fields = ['id', 'name', 'organizer', 'date', 'location', 'openForRegistration', 'international', 'judges']

class ShortEntrySerializer(serializers.ModelSerializer):
    cat_model = CatSummarySerializer(source='cat')
    judge = serializers.SerializerMethodField()
    judge_name = serializers.SerializerMethodField()

    def get_judge(self, obj):
        return obj.judgement.judge.id if obj.judgement.judge else None

    def get_judge_name(self, obj):
        return obj.judgement.judge.person.name if obj.judgement.judge else None
    class Meta:
        model = Entry
        fields = ['id', 'cat_model', 'show', 'catalog_nr', 'guest', 'judge', 'judge_name']

class JudgementSerializer(serializers.ModelSerializer):
    ems = serializers.SerializerMethodField()
    cert = serializers.SerializerMethodField()

    def get_ems(self, obj):
        if(hasattr(obj,"entry")):
            return str(obj.entry.cat.ems)
        return ""
    
    def get_cert(self, obj):
        return obj.catcertification if hasattr(obj, "catcertification") else None
    
    class Meta:
        model = Judgement
        fields = ['id', 'judge_id', 'judgement', 'biv', 'abs', 'comment', 'nominations', 'ems', 'cert']

    def update(self, instance, validated_data):
        judge = validated_data.get('judge_id', instance.judge_id)
        j = Judge.objects.filter(id = judge)
        if(j.exists()):
            instance.judge = j[0]
        instance.judgement = validated_data.get('judgement', instance.judgement)
        instance.biv = validated_data.get('biv', instance.biv)        
        instance.abs = validated_data.get('abs', instance.abs)
        instance.comment = validated_data.get('comment', instance.comment)
        instance.save()
        return instance
    

class JudgeSerializer(serializers.ModelSerializer):  
    name = serializers.SerializerMethodField()
    country = serializers.SerializerMethodField()

    def get_name(self, obj):
        return str(obj.person.name)  

    def get_country(self, obj):
        return str(obj.person.country)  
    class Meta:
        model = Judge
        fields = ['id', 'show_id', 'person_id', 'name', 'country']
