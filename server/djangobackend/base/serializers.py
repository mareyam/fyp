from rest_framework import serializers
from .models import PRLogin, AdminLogin, BMLogin, BrandManager, Influencer, Brand, Hashtag, SubBrand, Campaign, Interest, ChildAge, ContentType

class AdminLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminLogin
        fields = "__all__"


class PRLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = PRLogin
        fields = "__all__"


class BMLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = BMLogin
        fields = "__all__"

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
    

class ContentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentType
        fields = "__all__"

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ["id", "name", "email","password"]
#         extra_kwargs = {
#             'password': {'write_only': True}
#         }

#     def create(self, validated_data):
#         password = validated_data.pop('password', None)
#         instance = self.Meta.model(**validated_data)
#         if password is not None:
#             instance.set_password(password)
#         instance.save()
#         return instance
