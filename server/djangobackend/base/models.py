from django.db import models
from django.contrib.auth.models import User
from django import forms


# Create your models here.

class Topic(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class Room(models.Model):
    host = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    topic = models.ForeignKey(Topic, on_delete = models.SET_NULL, null=True)
    name = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now = True)
    created = models.DateTimeField(auto_now_add = True)
    
    class Meta:
        ordering = ['-updated', '-created']
        
    def __str__(self):
        return self.name

class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    body = models.TextField()
    updated = models.DateTimeField(auto_now = True)
    created = models.DateTimeField(auto_now_add = True)
    
    def __str__(self):
        return self.name
    

class Campaign(models.Model):    
    campaignType_choices = (
         ("Periodic", "Periodic"),
         ("Single", "Single"),
     )
    campaignStatus_choices = (
         ("Active", "Active"),
         ("Inactive", "Inactive"),
         ("Completed", "Completed"),
     )

    campaignStoryPost = (
         ("Post", "Post"),
         ("Story", "Story"),
         ("Both", "Both"),
     )

    host = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200)
    hashtag = models.CharField(max_length=20, unique=True, blank=False, null=False)
    campaign_type = models.CharField(max_length=10, choices=campaignType_choices, blank=False, null=False, default='DEFAULT')
    status = models.CharField(max_length=20, choices=campaignStatus_choices, blank=True, null=True)
    content_type = models.CharField(max_length=20, choices=campaignStoryPost, blank=True, null=True)
    total_cost = models.IntegerField(blank=True, null=True)
    description = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now = True)
    created = models.DateTimeField(auto_now_add = True)
    
    class Meta:
        ordering = ['-updated', '-created']
        
    def __str__(self):
        return self.name
   

class Influencer(models.Model):
    influencerInterest_choices = (
         ("Fashion", "Fashion"),
         ("Gaming", "Gaming"),
         ("Food", "Food"),
         ("Entertainment", "Entertainment"),
         ("Family", "Family"),
         ("Gaming", "Gaming"),
         
     )
    SOME_CHOICES = (
    ('yes', 'Yes'),
    ('no', 'No'),
    ('cancelled', 'Cancelled'),
    )
    
    influencerUsername = models.CharField(max_length=20, unique=True, blank=False, null=False)
    influencerFullName = models.CharField(max_length=200)
    influencerBio =  models.TextField(null=True, blank=True)
    #influencerProfilePicture
    influencerChildrenCount = models.IntegerField(blank=True, null=True)
    influencerCampaignCount = models.IntegerField(blank=True, null=True)
    influencerChildrenAge = models.IntegerField(blank=True, null=True)
    influencerInfluencerPostCost = models.IntegerField(blank=True, null=True)
    influencerStoryCost = models.IntegerField(blank=True, null=True)
    #influencerInterests
    #influencerStoryCount
    #influencerFollowerCount
    #influencerFollowingCount
    #influencerPostCount
    
    # my_field = forms.MultipleChoiceField(choices=influencerInterest_choices, widget=forms.CheckboxSelectMultiple())
    # def clean_my_field(self):
    #     if len(self.cleaned_data['my_field']) > 3:
    #         raise forms.ValidationError('Select no more than 3.')
    #     return self.cleaned_data['my_field']


class BrandManager(models.Model):   
    host = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    brandmanager_name = models.CharField(max_length=200)
    brandmanager_username = models.CharField(max_length=20, unique=True, blank=False, null=False)
    password = models.CharField(max_length=200)
    phone_number = models.IntegerField(blank=True, null=True)
    # pfp
    # email
    updated = models.DateTimeField(auto_now = True)
    created = models.DateTimeField(auto_now_add = True)
    
    class Meta:
        ordering = ['-updated', '-created']
        
    def __str__(self):
        return self.name

class Brand(models.Model):
    brandmanager_name = models.ForeignKey(BrandManager.brandmanager_name, on_delete=models.SET_NULL, unique=True, blank=False, null=False)
    brand_name = models.CharField(max_length=20, unique=True, blank=False, null=False)
    campaigns_done = models.CharField(max_length=20, unique=True, blank=False, null=False)

class Admin(models.Model):
    admin_username:models.CharField(max_length=20, unique=True, blank=False, null=False)
    # admin_password:

class PRAgency(models.Model):
    pragency_username:models.CharField(max_length=20, unique=True, blank=False, null=False)
    # pragency_password:

