from django.db import models
from django.contrib.auth.models import User


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