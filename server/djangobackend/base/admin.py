from django.contrib import admin
# Register your models here.
from .models import  Campaign, Influencer, Brand, BrandManager, PRAgency, Hashtag, SubBrand


admin.site.register(Campaign)
admin.site.register(Influencer)
admin.site.register(Brand)
admin.site.register(BrandManager)
admin.site.register(PRAgency)
admin.site.register(Hashtag)
admin.site.register(SubBrand)








