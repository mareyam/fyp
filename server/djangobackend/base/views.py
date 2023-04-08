from django.shortcuts import render, redirect
from django.db.models import Q
from .models import Room, Campaign, Brand, BrandManager,Influencer, PRAgency, Hashtag, Filter, CampaignSample
from .forms import RoomForm, CampaignForm, BrandForm, BrandManagerForm, InfluencerForm, PRAgencyForm, HashtagForm, FilterForm
from django.http import JsonResponse
from rest_framework.renderers import JSONRenderer
from django.http import HttpResponse, JsonResponse
from rest_framework import generics
from .serializers import CampaignSerializer
from rest_framework.parsers import JSONParser
import io
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

def campaignsample(request):
    campaign = CampaignSample.objects.get(id=1)
    serializer = CampaignSerializer(campaign)
    return JsonResponse(serializer.data)

def campaign_list(request):
    campaign = CampaignSample.objects.all()
    serializer = CampaignSerializer(campaign, many=True)
    return JsonResponse(serializer.data, safe=False)

@csrf_exempt    
def campaign_create(request):
    if request.method == 'POST':
     json_data = request.body
     stream = io.BytesIO(json_data)
     pythondata = JSONParser().parse(stream)
     serializer = CampaignSerializer(data=pythondata)
     if serializer.is_valid():
         serializer.save()
         res = {'msg': 'data created'}
         json_data =  JSONRenderer().render(res)
         return HttpResponse(json_data, content_type='application/json')
    json_data = JSONRenderer().render(serializer.errors)
    return HttpResponse(json_data, content_type='application/json')




def home(request):
    rooms = Room.objects.all()
    room_count = rooms.count()
    context = {'rooms':rooms, 'room_count': room_count}
    return render(request, 'base/home.html', context)

def room(request,pk):
    room = Room.objects.get(id=pk)
    context = {'room':room}
    return render(request, 'base/room.html',context)

def createRoom(request):
    form = RoomForm()
    if request.method == 'POST':
        form = RoomForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('home')
    context = {'form':form}
    return render(request, 'base/room_form.html', context)

def updateRoom(request,pk):
    room = Room.objects.get(id=pk)
    form = RoomForm(instance=room)
    if request.method == "POST":
        form = RoomForm(request.POST, instance=room)
        if form.is_valid():
            form.save()
            return redirect('home')
        
    context = {'form':form}
    return render(request, 'base/room_form.html', context)

def deleteRoom(request,pk):
    room = Room.objects.get(id=pk)
    if request.method == "POST":
        room.delete()
        return redirect('home')
    return render(request, 'base/room_form.html', {'obj':room})

#Campaigns
def campaign(request,pk):
    campaign = Campaign.objects.get(id=pk)
    context = {'campaign':campaign}
    return render(request, 'base/campaigns/campaign.html',context)

def campaigns(request):
     campaigns = Campaign.objects.all()
     campaign_data = list(campaigns.values())
     return JsonResponse({'campaigns': campaign_data})


# def campaigns(request):
#      campaigns = Campaign.objects.all()
#      return render(request, 'base/campaigns/campaigns.html', {'campaigns':campaigns})

def createCampaign(request):
    form = CampaignForm()
    if request.method == 'POST':
        form = CampaignForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('campaigns')
    context = {'form':form}
    return render(request, 'base/campaigns/campaign_form.html', context)

def updateCampaign(request,pk):
    room = Campaign.objects.get(id=pk)
    form = CampaignForm(instance=room)
    if request.method == "POST":
        form = RoomForm(request.POST, instance=room)
        if form.is_valid():
            form.save()
            return redirect('campaigns')
    context = {'form':form}
    return render(request, 'base/campaigns/campaign_form.html', context)

def deleteCampaign(request,pk):
    campaign = Campaign.objects.get(id=pk)
    if request.method == "POST":
        campaign.delete()
        return redirect('campaigns')
    return render(request, 'base/campaigns/campaign_form.html', {'obj':campaign})



#brand
def brand(request,pk):
    brand = Brand.objects.get(id=pk)
    context = {'brand':brand}
    return render(request, 'base/brand/brand.html',context)

def brands(request):
    brands = Brand.objects.all()
    brand_count = brands.count()
    context = {'brands':brands, 'brands':brands}
    return render(request, 'base/brand/brands.html', context)

def createBrand(request):
    form = BrandForm()
    if request.method == 'POST':
        form = BrandForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('brands')
    context = {'form':form}
    return render(request, 'base/brand/brand_form.html', context)

def updateBrand(request,pk):
    brand = Brand.objects.get(id=pk)
    form = BrandForm(instance=brand)
    if request.method == "POST":
        form = BrandForm(request.POST, instance=brand)
        if form.is_valid():
            form.save()
            return redirect('brands')
    context = {'form':form}
    return render(request, 'base/brand/brand_form.html', context)

def deleteBrand(request,pk):
    brand = Brand.objects.get(id=pk)
    if request.method == "POST":
        brand.delete()
        return redirect('brands')
    return render(request, 'base/brand/brand_form.html', {'obj':brand})

#brandManager
def brandManager(request,pk):
    brandmanager = BrandManager.objects.filter(id=pk).values()
    return JsonResponse({'brandmanager': list(brandmanager)})    
    # brandManager = BrandManager.objects.get(id=pk)
    # context = {'brandManager':brandManager}
    # return render(request, 'base/brandManager/brandManager.html',context)

def brandManagers(request):
    brandmanagers = BrandManager.objects.all()
    brandmanager_data = list(brandmanagers.values())
    return JsonResponse({'brandmanagers': brandmanager_data})
    # brandManagers = BrandManager.objects.all()
    # brandManager_count = brandManagers.count()
    # context = {'brandManagers':brandManagers, 'brandManagers':brandManagers}
    # return render(request, 'base/brand/brandManagers.html', context)



def createBrandManager(request):
    form = BrandManagerForm()
    if request.method == 'POST':
        form = BrandManagerForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('brandManagers')
    context = {'form':form}
    return render(request, 'base/brandManager/brandManager_form.html', context)

def updateBrandManager(request,pk):
    brandManager = BrandManager.objects.get(id=pk)
    form = BrandManagerForm(instance=brandManager)
    if request.method == "POST":
        form = BrandManagerForm(request.POST, instance=brandManager)
        if form.is_valid():
            form.save()
            return redirect('brandManagers')
    context = {'form':form}
    return render(request, 'base/brandManager/brandManager_form.html', context)

def deleteBrandManager(request,pk):
    brandManager = BrandManager.objects.get(id=pk)
    if request.method == "POST":
        brandManager.delete()
        return redirect('brandManagers')
    return render(request, 'base/brandManager/brandManager_form.html', {'obj':brandManager})

#Influencer
def influencer(request,pk):
    influencer = Influencer.objects.get(id=pk)
    context = {'influencer':influencer}
    return render(request, 'base/influencers/influencer.html',context)

def influencers(request):
    influencers = Influencer.objects.all()
    influencer_count = influencers.count()
    context = {'influencers':influencers, 'influencers':influencers}
    return render(request, 'base/influencers/influencers.html', context)

def createInfluencer(request):
    form = InfluencerForm()
    if request.method == 'POST':
        form = InfluencerForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('influencers')
    context = {'form':form}
    return render(request, 'base/influencers/influencer_form.html', context)

def updateInfluencer(request,pk):
    influencer = Influencer.objects.get(id=pk)
    form = InfluencerForm(instance=influencer)
    if request.method == "POST":
        form = InfluencerForm(request.POST, instance=influencer)
        if form.is_valid():
            form.save()
            return redirect('influencers')
    context = {'form':form}
    return render(request, 'base/influencers/influencer_form.html', context)

def deleteInfluencer(request,pk):
    influencer = Influencer.objects.get(id=pk)
    if request.method == "POST":
        influencer.delete()
        return redirect('influencers')
    return render(request, 'base/influencers/influencer_form.html', {'obj':influencer})


#PRAgency
def pragency(request,pk):
    pragency = PRAgency.objects.get(id=pk)
    context = {'pragency':pragency}
    return render(request, 'base/PRAgency/pragency.html',context)

def PRAgencys(request):
    pragencys = PRAgency.objects.all()
    pragency_count = pragencys.count()
    context = {'pragencys':pragencys, 'pragencys':pragencys}
    return render(request, 'base/PRAgency/pragencys.html', context)

def createPRAgency(request):
    form = PRAgencyForm()
    if request.method == 'POST':
        form = PRAgencyForm(request.POST, files=request.FILES)
        if form.is_valid():
            form.save()
            return redirect('pragencys')
    context = {'form':form}
    return render(request, 'base/PRAgency/pragency_form.html', context)

def updatePRAgency(request,pk):
    PRAgency = PRAgency.objects.get(id=pk)
    form = PRAgencyForm(instance=PRAgency)
    if request.method == "POST":
        form = PRAgencyForm(request.POST, instance=PRAgency)
        if form.is_valid():
            form.save()
            return redirect('PRAgencys')
    context = {'form':form}
    return render(request, 'base/PRAgency/pragency_form.html', context)

def deletePRAgency(request,pk):
    PRAgency = PRAgency.objects.get(id=pk)
    if request.method == "POST":
        PRAgency.delete()
        return redirect('PRAgencys')
    return render(request, 'base/PRAgency/pragency_form.html', {'obj':PRAgency})


#Hashtags
def hashtag(request,pk):
    hashtag = Hashtag.objects.get(id=pk)
    context = {'hashtag':hashtag}
    return render(request, 'base/hashtag/hashtag.html',context)

def hashtags(request):
    hashtags = Hashtag.objects.all()
    hashtag_count = hashtags.count()
    context = {'hashtags':hashtags, 'hashtags':hashtags}
    return render(request, 'base/hashtag/hashtags.html', context)

def createHashtag(request):
    form = HashtagForm()
    if request.method == 'POST':
        form = HashtagForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('hashtags')
    context = {'form':form}
    return render(request, 'base/hashtag/hashtag_form.html', context)

def updateHashtag(request,pk):
    hashtag = Hashtag.objects.get(id=pk)
    form = HashtagForm(instance=hashtag)
    if request.method == "POST":
        form = HashtagForm(request.POST, instance=hashtag)
        if form.is_valid():
            form.save()
            return redirect('hashtags')
    context = {'form':form}
    return render(request, 'base/hashtag/hashtag_form.html', context)

def deleteHashtag(request,pk):
    hashtag = Hashtag.objects.get(id=pk)
    if request.method == "POST":
        hashtag.delete()
        return redirect('hashtags')
    return render(request, 'base/hashtag/hashtag_form.html', {'obj':hashtag})


#Filters
def filters(request):
    filters = Filter.objects.all()
    filter_count = filters.count()
    context = {'filters':filters, 'filters':filters}
    return render(request, 'base/filters/filters.html', context)

def createFilter(request):
    form = FilterForm()
    if request.method == 'POST':
        form = FilterForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('filters')
    context = {'form':form}
    return render(request, 'base/filters/filter_form.html', context)

def updateFilter(request,pk):
    filter = Filter.objects.get(id=pk)
    form = FilterForm(instance=filter)
    if request.method == "POST":
        form = FilterForm(request.POST, instance=filter)
        if form.is_valid():
            form.save()
            return redirect('filters')
    context = {'form':form}
    return render(request, 'base/filters/filter_form.html', context)

def deleteFilter(request,pk):
    filter = Filter.objects.get(id=pk)
    if request.method == "POST":
        filter.delete()
        return redirect('filters')
    return render(request, 'base/filter/filter_form.html', {'obj':filter})
