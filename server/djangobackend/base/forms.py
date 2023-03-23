from django.forms import ModelForm
from .models import Room
from .models import Campaign


class RoomForm(ModelForm):
    class Meta:
        model = Room
        fields = '__all__'

class CampaignForm(ModelForm):
    class Meta:
        model = Campaign
        fields = '__all__'