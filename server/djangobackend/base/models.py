from django.db import models
from django.contrib.auth.models import User
from django import forms
from datetime import datetime
from django.utils import timezone

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

class PRAgency(models.Model):
    pragency_username = models.CharField(max_length=20, unique=False, blank=False, null=False, default='')
    # pragency_password:
    image = models.ImageField(upload_to='images/',  default='')
    updated = models.DateTimeField(auto_now = True)
    created = models.DateTimeField(auto_now_add = True)
    class Meta:
        ordering = ['-updated', '-created']
        
    def __str__(self):
        return self.pragency_username

class BrandManager(models.Model):   
    host = models.OneToOneField(User, unique=False, on_delete=models.CASCADE, blank=False, null=False)
    brandmanager_name = models.CharField(max_length=200)
    brandmanager_username = models.CharField(max_length=20, unique=False, blank=False, null=False)
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
    brand_name = models.CharField(max_length=20, unique=False, blank=False, null=False)
    campaigns_count = models.IntegerField(max_length=20, blank=False, null=False)
    updated = models.DateTimeField(auto_now = True)
    created = models.DateTimeField(auto_now_add = True)
    # campaigns = models.ForeignKey(Campaign, unique=False, blank=True, null=True)

    class Meta:
        ordering = ['-updated', '-created']
        
    def __str__(self):
        return self.brand_name

class SubBrand(models.Model):
    brandmanager_name = models.ForeignKey(Brand, on_delete=models.CASCADE, blank=False, null=False)
    subbrand_name = models.CharField(max_length=20, unique=False, blank=False, null=False)
    updated = models.DateTimeField(auto_now = True)
    created = models.DateTimeField(auto_now_add = True)
    # campaigns = models.ForeignKey(Campaign, unique=False, blank=True, null=True)

    class Meta:
        ordering = ['-updated', '-created']
        
    def __str__(self):
        return self.subbrand_name


class Influencer(models.Model):
    INFLUENCER_INTEREST_CHOICES = (
        ('Fashion', 'Fashion'),
        ('Gaming', 'Gaming'),
        ('Food', 'Food'),
        ('Entertainment', 'Entertainment'),
        ('Family', 'Family'),
    )
    
    influencer_username = models.CharField(max_length=20, unique=False)
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
    brandmanager = models.ForeignKey(BrandManager, on_delete=models.CASCADE, null=True, unique=False)
    # influencer_campaign_cost =  models.ForeignKey(InfluencerCost, on_delete=models.SET_NULL, null=True, unique=False)
    # filters =  models.ForeignKey(Filter, on_delete=models.SET_NULL, null=True, unique=False)
    created = models.DateTimeField(default=datetime.now)
    updated = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['-updated', '-created']

    def __str__(self):
        return self.influencer_username


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

    content_type = (
        ("Post", "Post"),
        ("Story", "Story"),
        ("Both", "Both"),
    )

    brand_manager = models.ForeignKey(BrandManager, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=200)
    # hashtag = models.OneToOneField(Hashtag, unique=False, blank=False, null=False ,  on_delete=models.CASCADE)
    # brand = models.ForeignKey(Brand, blank=False, null=False, on_delete=models.CASCADE, default='')
    campaign_type = models.CharField(max_length=20,choices=campaignType_choices, blank=False, null=False, default='DEFAULT')
    status = models.CharField(max_length=20,choices=campaignStatus_choices, blank=True, null=True)
    content_type = models.CharField(max_length=20,choices=content_type, blank=True, null=True)
    budget = models.IntegerField(blank=False, null=False)
    description = models.TextField(null=True, blank=True)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    image = models.ImageField(upload_to='images/', default='')
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    influencers = models.ManyToManyField(Influencer, blank=True)
    cost_per_influencer = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)
    
    class Meta:
        ordering = ['-updated', '-created']

    def __str__(self):
        return self.name 
   
    def estimated_cost(self):
        num_influencers = self.influencers.count()
        if num_influencers == 0 or not self.cost_per_influencer:
            return 0
        return num_influencers * self.cost_per_influencer


class Hashtag(models.Model):    
    hashtag = models.CharField(max_length=20, unique=True, blank=False, null=False)
    host = models.ForeignKey(BrandManager, on_delete=models.CASCADE, null=False)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, null=False)
    # influencer_hashtag = models.ForeignKey(Hashtag, on_delete=models.SET_NULL, null=True)
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE, null=False)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-updated', '-created']

    def __str__(self):
        return self.hashtag
    
   

class InfluencerCost(models.Model):
    username= models.CharField(max_length=100,unique=True, null=False)
    storyCost= models.IntegerField(blank=False, null=False)
    postCost= models.IntegerField(blank=False, null=False)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-updated', '-created']

    def __str__(self):
        return self.username

class Filter(models.Model):   
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    )

    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    min_followers = models.IntegerField()
    max_followers = models.IntegerField()
    min_age = models.IntegerField()
    max_age = models.IntegerField()
    parents = models.BooleanField(default=False)
    min_children_count = models.IntegerField(null=True, blank=True)
    max_children_count = models.IntegerField(null=True, blank=True)
    min_child_age = models.IntegerField(null=True, blank=True)
    max_child_age = models.IntegerField(null=True, blank=True)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, null=False)
    hashtag = models.ForeignKey(Hashtag,unique=True, blank=False, null=False, on_delete=models.CASCADE)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-updated', '-created']

    def __str__(self):
        return self.gender

    



#campaigns
    
class CampaignDetailsWithInfluencer(models.Model): 
    brandName= models.ForeignKey(Brand, on_delete=models.SET_NULL, null=True) 
    created= models.DateTimeField(auto_now_add=True)
    influencerName= models.OneToOneField(Influencer, on_delete=models.CASCADE, blank=True)
    # influencerUsername =models.ManyToManyField(Influencer, blank=True,  on_delete=models.CASCADE)
    # cost= models.OneToOneField(Influencer, blank=True, on_delete=models.CASCADE)
    # linkToPost=
    postedDate = models.DateTimeField(auto_now_add=True)
    hashtag = models.OneToOneField(Hashtag, unique=False, blank=False, null=False ,  on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/',  default='')
    





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
