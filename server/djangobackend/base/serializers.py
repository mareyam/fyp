from rest_framework import serializers
from .models import BrandManager, Campaign, Influencer, NewInfluencer, Brand, PRAgency, Hashtag,  User, SubBrand, NewCampaign


class BrandManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = BrandManager
        fields = "__all__"

class CampaignSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campaign
        fields = "__all__"

class NewCampaignSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewCampaign
        fields = "__all__"


class InfluencerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Influencer
        fields = "__all__"

class NewInfluencerSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewInfluencer
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


class PRAgencySerializer(serializers.ModelSerializer):
    class Meta:
        model = PRAgency
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "name", "email","password"]
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
