from django.http import JsonResponse
from .models import Campaign
from .serializer import CampaignSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET','POST'])
def campaign_list(request):
    if request.method == 'GET':
     campaigns = Campaign.objects.all()
     serializer = CampaignSerializer(campaigns, many=True)
     return JsonResponse({'campaignsurl':serializer.data})
    
    if request.method == 'POST':
     serializer = CampaignSerializer(data = request.data)
     if serializer.is_valid():
       serializer.save()
       return Response(serializer.data, status=status.HTTP_201_CREATED)
    