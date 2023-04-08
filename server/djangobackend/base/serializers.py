
from rest_framework import serializers
from .models import CampaignSample

class CampaignSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    brandmanager = serializers.CharField(max_length=100)
    cost = serializers.IntegerField()
    
def create(self, validate_data):
    return CampaignSample.objects.create(**validate_data)
