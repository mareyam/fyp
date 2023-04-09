from django.contrib import admin
# Register your models here.
from .models import Room, Topic, Campaign, Message, Influencer, Brand, BrandManager, PRAgency, Hashtag, Filter, Drinks, Campaigns

admin.site.register(Campaigns)
admin.site.register(Room)
admin.site.register(Topic)
admin.site.register(Message)
admin.site.register(Campaign)
admin.site.register(Influencer)
admin.site.register(Brand)
admin.site.register(BrandManager)
admin.site.register(PRAgency)
admin.site.register(Hashtag)
admin.site.register(Filter)
admin.site.register(Drinks)






