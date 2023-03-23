from django.shortcuts import render, redirect

from .models import Room
from .models import Campaign

from .forms import RoomForm
from .forms import CampaignForm


# Create your views here.
rooms = [
    {'id':1, 'name': 'lets learn python'},
    {'id':2, 'name': 'python'},
    {'id':3, 'name': 'lets '},
]

campaignsList = [
    {'id':1, 'name': 'lets learn python'},
    {'id':2, 'name': 'python'},
    {'id':3, 'name': 'lets '},
]
def home(request):
    rooms = Room.objects.all()
    context = {'rooms':rooms}
    return render(request, 'base/home.html', context)

def campaigns(request):
    campaigns = Campaign.objects.all()
    context = {'campaigns':campaigns}
    return render(request, 'base/campaigns.html', context)

def room(request,pk):
    room = Room.objects.get(id=pk)
    context = {'room':room}
    return render(request, 'base/room.html',context)


def campaign(request,pk):
    campaign = Campaign.objects.get(id=pk)
    context = {'campaign':campaign}
    return render(request, 'base/campaign.html',context)

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
    campaign = Room.objects.get(id=pk)
    if request.method == "POST":
        campaign.delete()
        return redirect('home')
    return render(request, 'base/campaign_form.html', {'obj':campaign})


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

