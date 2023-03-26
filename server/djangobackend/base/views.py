from django.shortcuts import render, redirect

from .models import Room, Topic
from .models import Campaign
from .models import Brand, BrandManager
from .models import Influencer
from .models import SampleModel


from .forms import RoomForm
from .forms import CampaignForm
from .forms import BrandForm, BrandManagerForm
from .forms import InfluencerForm
from .forms import SampleModelForm




# Create your views here.

def home(request):
    rooms = Room.objects.all()
    room_count = rooms.count()
    context = {'rooms':rooms, 'room_count': room_count}
    return render(request, 'base/home.html', context)

def room(request,pk):
    room = Room.objects.get(id=pk)
    context = {'room':room}
    return render(request, 'base/room.html',context)

def sampleModel(request):
    sampleModels = SampleModel.objects.all()
    sampleModel_count = sampleModels.count()
    context = {'sampleModels':sampleModels, 'sampleModel_count': sampleModel_count}
    return render(request, 'base/samplemodel.html', context)


def campaign(request,pk):
    campaign = Campaign.objects.get(id=pk)
    context = {'campaign':campaign}
    return render(request, 'base/campaign.html',context)


def campaigns(request):
    campaigns = Campaign.objects.all()
    campaign_count = campaigns.count()
    context = {'campaigns':campaigns, 'campaigns':campaigns}
    return render(request, 'base/campaigns.html', context)

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


def createCampaign(request):
    form = CampaignForm()
    if request.method == 'POST':
        form = CampaignForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('campaigns')
    context = {'form':form}
    return render(request, 'base/campaign_form.html', context)

def updateCampaign(request,pk):
    room = Campaign.objects.get(id=pk)
    form = CampaignForm(instance=room)
    if request.method == "POST":
        form = RoomForm(request.POST, instance=room)
        if form.is_valid():
            form.save()
            return redirect('campaigns')
    context = {'form':form}
    return render(request, 'base/campaign_form.html', context)

def deleteCampaign(request,pk):
    campaign = Campaign.objects.get(id=pk)
    if request.method == "POST":
        campaign.delete()
        return redirect('campaigns')
    return render(request, 'base/campaign_form.html', {'obj':campaign})




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



def brandManager(request,pk):
    brandManager = BrandManager.objects.get(id=pk)
    context = {'brandManager':brandManager}
    return render(request, 'base/brandManager/brandManager.html',context)


def brandManagers(request):
    brandManagers = BrandManager.objects.all()
    brandManager_count = brandManagers.count()
    context = {'brandManagers':brandManagers, 'brandManagers':brandManagers}
    return render(request, 'base/brand/brandManagers.html', context)

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


def influencer(request,pk):
    influencer = Influencer.objects.get(id=pk)
    context = {'influencer':influencer}
    return render(request, 'base/influencer.html',context)


def influencers(request):
    influencers = Influencer.objects.all()
    influencer_count = influencers.count()
    context = {'influencers':influencers, 'influencers':influencers}
    return render(request, 'base/influencers.html', context)

def createInfluencer(request):
    form = InfluencerForm()
    if request.method == 'POST':
        form = InfluencerForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('influencers')
    context = {'form':form}
    return render(request, 'base/influencer_form.html', context)

def updateInfluencer(request,pk):
    influencer = Influencer.objects.get(id=pk)
    form = InfluencerForm(instance=influencer)
    if request.method == "POST":
        form = InfluencerForm(request.POST, instance=influencer)
        if form.is_valid():
            form.save()
            return redirect('influencers')
    context = {'form':form}
    return render(request, 'base/influencer_form.html', context)

def deleteInfluencer(request,pk):
    influencer = Influencer.objects.get(id=pk)
    if request.method == "POST":
        influencer.delete()
        return redirect('influencers')
    return render(request, 'base/influencer_form.html', {'obj':influencer})



# def campaigns(request):
#     context = {'campaigns':campaigns}
#     return render(request, 'base/campaigns.html', context)

# def campaign(request,pk):
#     campaign = None
#     for i in campaigns:
#         if i['id'] == int(pk):
#             campaign = i
#     context = {'campaign':campaign}
#     return render(request, 'base/campaign.html', context)


