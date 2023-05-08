from django.forms import ModelForm
from django import forms
from .models import Brand , BrandManager, Hashtag, Influencer, Campaign


class CampaignForm(forms.ModelForm):
    influencers = forms.ModelMultipleChoiceField(queryset=Influencer.objects.all())
    class Meta:
        model = Campaign
        fields = '__all__'

class InfluencerForm(ModelForm):
    class Meta:
        model = Influencer
        fields = '__all__'

class BrandForm(ModelForm):
    class Meta:
        model = Brand
        fields = '__all__'
        
class BrandManagerForm(ModelForm):
    class Meta:
        model = BrandManager
        fields = '__all__'

class HashtagForm(ModelForm):
    class Meta:
        model = Hashtag
        fields = '__all__'
