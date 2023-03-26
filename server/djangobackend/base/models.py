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

    class Meta:
        ordering = ['-updated', '-created']
    
    def __str__(self):
        return self.body
    
class SampleModel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    updated = models.DateTimeField(auto_now = True)
    created = models.DateTimeField(auto_now_add = True)

    class Meta:
        ordering = ['-updated', '-created']
    
    def __str__(self):
        return self.user

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
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-updated', '-created']

    def __str__(self):
        return self.name 

class Influencer(models.Model):
    INFLUENCER_INTEREST_CHOICES = (
        ('Fashion', 'Fashion'),
        ('Gaming', 'Gaming'),
        ('Food', 'Food'),
        ('Entertainment', 'Entertainment'),
        ('Family', 'Family'),
    )
    
    influencer_username = models.CharField(max_length=20, unique=True)
    influencer_full_name = models.CharField(max_length=200)
    influencerChildrenCount = models.IntegerField(blank=True, null=True)
    influencerCampaignCount = models.IntegerField(blank=True, null=True)
    influencerChildrenAge = models.IntegerField(blank=True, null=True)
    influencerInfluencerPostCost = models.IntegerField(blank=True, null=True)
    influencerStoryCost = models.IntegerField(blank=True, null=True)
    #influencerInterests
    influencerStoryCount = models.IntegerField(blank=True, null=True)
    influencerFollowerCount = models.IntegerField(blank=True, null=True)
    influencerFollowingCount = models.IntegerField(blank=True, null=True)
    influencerPostCount = models.IntegerField(blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated', '-created']

    def __str__(self):
        return self.influencer_username


class BrandManager(models.Model):   
    host = models.OneToOneField(User, unique=True, on_delete=models.CASCADE, blank=False, null=False)
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
        return self.brandmanager_name

class Brand(models.Model):
    brandmanager_name = models.OneToOneField(BrandManager, on_delete=models.CASCADE, blank=False, null=False)
    brand_name = models.CharField(max_length=20, unique=True, blank=False, null=False)
    campaigns_done = models.CharField(max_length=20, blank=False, null=False)
    updated = models.DateTimeField(auto_now = True)
    created = models.DateTimeField(auto_now_add = True)

    class Meta:
        ordering = ['-updated', '-created']
        
    def __str__(self):
        return self.brand_name

# class Admin(models.Model):
#     admin_username = models.CharField(max_length=20, unique=True, blank=False, null=False, default='')
#     # admin_password:
#     updated = models.DateTimeField(auto_now = True)
#     created = models.DateTimeField(auto_now_add = True)

#     class Meta:
#         ordering = ['-updated', '-created']
        
#     def __str__(self):
#         return self.admin_username
    

# class PRAgency(models.Model):
#     pragency_username = models.CharField(max_length=20, unique=True, blank=False, null=False, default='')
#     # pragency_password:
#     updated = models.DateTimeField(auto_now = True)
#     created = models.DateTimeField(auto_now_add = True)
#     class Meta:
#         ordering = ['-updated', '-created']
        
#     def __str__(self):
#         return self.pragency_username



#  #influencerProfilePicture

    # influencer_bio = models.TextField(blank=True, null=True)
    # influencer_children_count = models.IntegerField(blank=True, null=True)
    # influencer_campaign_count = models.IntegerField(blank=True, null=True)
    # influencer_children_age = models.IntegerField(blank=True, null=True)
    # influencer_post_cost = models.IntegerField(blank=True, null=True)
    # influencer_story_cost = models.IntegerField(blank=True, null=True)
    # influencer_story_count = models.IntegerField(blank=True, null=True)
    # influencer_follower_count = models.IntegerField(blank=True, null=True)
    # influencer_following_count = models.IntegerField(blank=True, null=True)
    # influencer_post_count = models.IntegerField(blank=True, null=True)
    # influencer_interest = models.CharField(max_length=20, choices=INFLUENCER_INTEREST_CHOICES, blank=True, null=True)
