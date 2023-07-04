from django.contrib import admin
from .models import UserAccount,Influencer, Interest, ChildAge

# Register your models here.
admin.site.register(UserAccount)
admin.site.register(Influencer)
admin.site.register(Interest)
admin.site.register(ChildAge)

