from django.contrib import admin
from django.urls import path
from campaigns import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('campaigsnurl/', views.campaign_list)
]
