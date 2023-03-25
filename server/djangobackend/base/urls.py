from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="home"),
    path('room/<str:pk>/', views.room, name="room"),   
    path('create-room/', views.createRoom, name='create-room'),
    path('update-room/<str:pk>/', views.updateRoom, name='update-room'),
    path('delete-room/<str:pk>/', views.deleteRoom, name='delete-room'),
   
    path('campaigns/', views.campaigns, name="campaigns"), 
    path('campaign/<str:pk>/', views.campaign, name="campaign"),   
    path('create-campaign/', views.createCampaign, name='create-campaign'),
    path('update-campaign/<str:pk>/', views.updateCampaign, name='update-campaign'),
    path('delete-campaign/<str:pk>/', views.deleteCampaign, name='delete-campaign'),

    path('influencers/', views.influencers, name="influencers"), 
    path('create-influencer/', views.createInfluencer, name='create-influencer'),
    path('influencer/<str:pk>/', views.influencer, name="influencer"),   
    path('update-influencer/<str:pk>/', views.updateInfluencer, name='update-influencer'),
    path('delete-influencer/<str:pk>/', views.deleteInfluencer, name='delete-influencer'),

    path('brands/', views.brands, name="brands"), 
    path('create-brand/', views.createBrand, name='create-brand'),
    path('brand/<str:pk>/', views.brand, name="brand"),   
    path('update-brand/<str:pk>/', views.updateBrand, name='update-brand'),
    path('delete-brand/<str:pk>/', views.deleteBrand, name='delete-brand'),

]