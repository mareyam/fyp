from django.urls import path
from . import views

urlpatterns = [
    path('newcampaign/', views.home),
]
