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
    path('influencer/<str:pk>/', views.influencer, name="influencer"),   
    path('create-influencer/', views.createInfluencer, name='create-influencer'),
    path('update-influencer/<str:pk>/', views.updateInfluencer, name='update-influencer'),
    path('delete-influencer/<str:pk>/', views.deleteInfluencer, name='delete-influencer'),

    path('brands/', views.brands, name="brands"), 
    path('create-brand/', views.createBrand, name='create-brand'),
    path('brand/<str:pk>/', views.brand, name="brand"),   
    path('update-brand/<str:pk>/', views.updateBrand, name='update-brand'),
    path('delete-brand/<str:pk>/', views.deleteBrand, name='delete-brand'),

    path('brandmanagers/', views.brandManagers, name="brandmanagers"), 
    path('create-brandmanager/', views.createBrandManager, name='create-brandmanager'),
    path('brandmanager/<str:pk>/', views.brandManager, name="brandmanager"),   
    path('update-brandmanager/<str:pk>/', views.updateBrandManager, name='update-brandmanager'),
    path('delete-brandmanager/<str:pk>/', views.deleteBrandManager, name='delete-brandmanager'),

    path('pragencys/', views.PRAgencys, name="pragencys"), 
    path('pragency/<str:pk>/', views.pragency, name="pragency"),   
    path('create-pragency/', views.createPRAgency, name='create-pragency'),
    path('update-pragency/<str:pk>/', views.updatePRAgency, name='update-pragency'),
    path('delete-pragency/<str:pk>/', views.deletePRAgency, name='delete-pragency'),

    path('hashtags/', views.hashtags, name="hashtags"), 
    path('hashtag/<str:pk>/', views.hashtag, name="hashtag"),   
    path('create-hashtag/', views.createHashtag, name='create-hashtag'),
    path('update-hashtag/<str:pk>/', views.updateHashtag, name='update-hashtag'),
    path('delete-hashtag/<str:pk>/', views.deleteHashtag, name='delete-hashtag'),

    path('filters/', views.filters, name="filters"),  
    path('create-filter/', views.createFilter, name='create-filter'),
    path('update-filter/<str:pk>/', views.updateFilter, name='update-filter'),
    path('delete-filter/<str:pk>/', views.deleteFilter, name='delete-filter'),
]

