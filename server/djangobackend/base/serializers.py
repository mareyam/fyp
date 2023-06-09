from rest_framework import serializers
from .models import BrandManager, Influencer, Brand, Hashtag, SubBrand, Campaign, Interest, ChildAge

class BrandManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = BrandManager
        fields = "__all__"

class CampaignSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campaign
        fields = "__all__"

class InfluencerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Influencer
        fields = "__all__"

class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interest
        fields = "__all__"

class ChildAgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChildAge
        fields = "__all__"
        
class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = "__all__"

class BrandNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = "__all__"

class SubBrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubBrand
        fields = "__all__"

class HashtagSerializer(serializers.ModelSerializer):
    # brand = BrandNameSerializer()
    class Meta:
        model = Hashtag
        fields = "__all__"
    
