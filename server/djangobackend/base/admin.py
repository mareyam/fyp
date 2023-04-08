from django.contrib import admin
# Register your models here.
from .models import Room, Topic, Campaign, Message, Influencer, Brand, BrandManager, PRAgency, Hashtag, Filter,CampaignSample


@admin.register(CampaignSample)
class CampaignAdmin(admin.ModelAdmin):
 list_display = ['id','name','brandmanager', 'cost']


# class CampaignAdmin(admin.ModelAdmin):
#     readonly_fields = ('id',)

# @admin.register(BrandManager)
# class BrandManagerAdmin(admin.ModelAdmin):
#  list_display = ['host','brandmanager_name', 'brandmanager_username']

admin.site.register(Room)
admin.site.register(Topic)
admin.site.register(Message)
# admin.site.register(Campaign, CampaignAdmin)
admin.site.register(Influencer)
admin.site.register(Brand)
admin.site.register(BrandManager)
admin.site.register(PRAgency)
admin.site.register(Hashtag)
admin.site.register(Filter)






