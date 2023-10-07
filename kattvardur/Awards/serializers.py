from rest_framework import serializers
from Awards.models import Certification

class CertificationSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    def get_title(self, obj):
        return str(obj.title.name) if obj.title else None
    class Meta:
        model = Certification
        fields = ['id', 'name', 'ranking', 'next', 'title', 'certclass']
