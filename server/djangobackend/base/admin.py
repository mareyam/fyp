from django.contrib import admin
# Register your models here.
from .models import  Campaign, Influencer, NewInfluencer, Brand, BrandManager, PRAgency, Hashtag, SubBrand, NewCampaign


admin.site.register(Campaign)
admin.site.register(NewCampaign)

admin.site.register(Influencer)

admin.site.register(NewInfluencer)

admin.site.register(Brand)
admin.site.register(BrandManager)
admin.site.register(PRAgency)
admin.site.register(Hashtag)
admin.site.register(SubBrand)









