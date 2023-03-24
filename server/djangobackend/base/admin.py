from django.contrib import admin

# Register your models here.
from .models import Room, Topic, Campaign, Message, Influencer

admin.site.register(Room)
admin.site.register(Topic)
admin.site.register(Message)
admin.site.register(Campaign)
admin.site.register(Influencer)


