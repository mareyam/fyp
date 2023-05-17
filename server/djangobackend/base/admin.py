from django.contrib import admin
# Register your models here.
from .models import  PRLogin, PRRegistration, PRList, AdminLogin, BMLogin, Influencer, Brand, BrandManager, Hashtag, SubBrand, Campaign, Interest, ChildAge, ContentType


admin.site.register(Campaign)
admin.site.register(Influencer)
admin.site.register(Brand)
admin.site.register(BrandManager)
admin.site.register(Hashtag)
admin.site.register(SubBrand)
admin.site.register(Interest)
admin.site.register(ChildAge)
admin.site.register(ContentType)
admin.site.register(BMLogin)

admin.site.register(PRLogin)
admin.site.register(PRRegistration)
admin.site.register(PRList)





admin.site.register(AdminLogin)














