from django.contrib import admin
# Register your models here.
from .models import Influencer, Brand, Keyword, Campaign, Interest, ChildAge


admin.site.register(Campaign)
admin.site.register(Influencer)
admin.site.register(Brand)
admin.site.register(Keyword)
admin.site.register(Interest)
admin.site.register(ChildAge)














