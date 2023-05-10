from django.contrib import admin
# Register your models here.
from .models import  Influencer, Brand, BrandManager, Hashtag, SubBrand, Campaign, Interest, ChildAge, ContentType


admin.site.register(Campaign)
admin.site.register(Influencer)
admin.site.register(Brand)
admin.site.register(BrandManager)
admin.site.register(Hashtag)
admin.site.register(SubBrand)
admin.site.register(Interest)
admin.site.register(ChildAge)
admin.site.register(ContentType)













