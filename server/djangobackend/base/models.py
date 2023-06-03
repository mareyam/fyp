from django.db import models
from datetime import datetime
from django.utils.timezone import now
import datetime



# Create your models here.
    

class PRList(models.Model):
    name = models.CharField(max_length=128, blank=True, null=True, default='user') 
    email = models.EmailField(max_length=254, unique=False, default='user')
    password = models.CharField(max_length=128, blank=True, null=True) 
    updated = models.DateField(default=datetime.date.today, null=True, blank=True)
    created = models.DateField(default=datetime.date.today, null=True, blank=True)

    class Meta:
        ordering = ['-updated', '-created']

    def __str__(self):
        return self.email

class PRRegistration(models.Model):
    name = models.CharField(max_length=128, blank=True, null=True, default='user') 
    email = models.EmailField(max_length=254, unique=False, default='user')
    password = models.CharField(max_length=128, blank=True, null=True) 
    confirm_password = models.CharField(max_length=128, blank=True, null=True) 
    updated = models.DateField(default=datetime.date.today, null=True, blank=True)
    created = models.DateField(default=datetime.date.today, null=True, blank=True)

    class Meta:
        ordering = ['-updated', '-created']

    def __str__(self):
        return self.name

class PRLogin(models.Model):
    name = models.CharField(max_length=128, blank=True, null=True, default='user') 
    email = models.EmailField(max_length=254, unique=False, default='user')
    password = models.CharField(max_length=128, blank=True, null=True, default='null') 
    confirm_password = models.CharField(max_length=128, blank=True, null=True)   
    updated = models.DateField(default=datetime.date.today, null=True, blank=True)
    created = models.DateField(default=datetime.date.today, null=True, blank=True)

    class Meta:
        ordering = ['-updated', '-created']

    def __str__(self):
        return self.name

class AdminLogin(models.Model):
    name = models.CharField(max_length=128, blank=True, null=True, default='user') 
    email = models.EmailField(max_length=254, unique=False, default='user')
    password = models.CharField(max_length=128, blank=True, null=True) 

    def __str__(self):
        return self.name

class BMLogin(models.Model):
    name = models.CharField(max_length=128, blank=True, null=True, default='user') 
    email = models.EmailField(max_length=254, unique=False, default='user')
    password = models.CharField(max_length=128, blank=True, null=True) 
    brandName = models.CharField(max_length=128, blank=True, null=True, default='') 
    created = models.DateField(default=datetime.date.today, null=True, blank=True)
    
    def __str__(self):
        return str(self.name)
    
class BrandManager(models.Model):   
    # host = models.OneToOneField(User, unique=False, on_delete=models.CASCADE, blank=False, null=False)
    brandmanager_name = models.CharField(max_length=200, unique=False, blank=True, null=True, default='bm')
    brandmanager_username = models.CharField(max_length=20, unique=False, blank=True, null=True, default='bm')
    brandmanager_email = models.EmailField(max_length=254, unique=False, default='')
    brand_name = models.CharField(max_length=20, unique=False, blank=True, null=True, default='missing')
    password = models.CharField(max_length=128, blank=True, null=True)
    updated = models.DateField(default=now, null=True, blank=True)
    created = models.DateField(default=now, null=True, blank=True)
    
    class Meta:
        ordering = ['-updated', '-created']
        
    def __str__(self):
        return self.brandmanager_name

class SubBrand(models.Model):
    subbrand_name = models.CharField(max_length=20, unique=False, blank=False, null=False)
    updated = models.DateField(default=now, null=False, blank=False)
    created = models.DateField(default=now, null=False, blank=False)
    class Meta:
        ordering = ['-updated', '-created']
        
    def __str__(self):
        return self.subbrand_name
    
class Brand(models.Model):
    brandmanager_name = models.OneToOneField(BrandManager, on_delete=models.CASCADE, blank=False, null=False)
    brand_name = models.CharField(max_length=20, unique=False, blank=False, null=False)
    subbrand_name = models.ForeignKey(SubBrand, unique=False, blank=True, null=True, on_delete=models.CASCADE)
    campaigns_count = models.IntegerField(blank=False, null=False)
    updated = models.DateField(default=now, null=False, blank=False)
    created = models.DateField(default=now, null=False, blank=False)

    class Meta:
        ordering = ['-updated', '-created']
        
    def __str__(self):
        return self.brandmanager_name

class Interest(models.Model):
    INTEREST_CHOICES = [
        ('Fashion', 'Fashion'),
        ('Music', 'Music'),
        ('Food', 'Food'), 
        ('Health', 'Health'),
        ('Gaming', 'Gaming'),
        ('Dance', 'Dance'),
        ('Entertainment', 'Entertainment'),
        ('Family', 'Family'),
        ('Kids', 'Kids'),
        ('Other', 'Other')
    ]
    name = models.CharField(max_length=200, choices=INTEREST_CHOICES)

    def __str__(self):
        return str(self.name)
    
class ChildAge(models.Model):
    CHILD_AGE = [
        ('toddler','toddler'),
        ('preschooler','preschooler'),
        ('elementary','elementary'),
        ('teen','teen'),
        ('adult','adult'),
        ('None','None')
    ]
    name = models.CharField(max_length=200, choices=CHILD_AGE)

    def __str__(self):
        return self.name
    

class Influencer(models.Model):
    GENDER = (
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    )

    ISPARENT = (
        ("Yes","Yes"),
        ("No","No"),
    )

    image = models.ImageField(upload_to='images/', default='')
    username = models.CharField(max_length=20, unique=True, blank=True, null=True)
    fullname = models.CharField(max_length=200, blank=True, null=True)
    gender = models.CharField(max_length=20,choices=GENDER, blank=True, null=True, default='')
    age = models.IntegerField(blank=True, null=True, default=0)
    followers = models.IntegerField(blank=True, null=True, default=0)
    postcost = models.IntegerField(blank=True, null=True, default=0)
    storycost = models.IntegerField(blank=True, null=True , default=0)
    isparent = models.CharField(max_length=20,choices=ISPARENT, blank=True, null=True, default="No")
    children_count = models.IntegerField(blank=True, null=True, default=0)
    children_age = models.ManyToManyField('ChildAge', blank=True, default='None')
    interests = models.ManyToManyField('Interest', blank=True, default='Other')
    brandmanager = models.ForeignKey(BrandManager, on_delete=models.CASCADE, null=True, unique=False)
    created = models.DateField(default=now, null=True, blank=True)
    updated = models.DateField(default=now, null=True, blank=True)
    engagement_rate = models.IntegerField(blank=True, null=True, default=0)

    class Meta:
        ordering = ['-updated', '-created']

    def __str__(self):
        return self.username
    

class Hashtag(models.Model):    
    hashtag = models.CharField(max_length=20, unique=False, blank=False, null=False)
    brandmanager = models.ForeignKey(BrandManager, on_delete=models.CASCADE, null=False)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, null=False)
    updated = models.DateField(default=now)
    created = models.DateField(default=now)
    total_posts = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['-updated', '-created']

    def __str__(self):
        return self.hashtag
    
class ContentType(models.Model):
    CONTENT_TYPE = (
            ("Post", "Post"),
            ("Story", "Story"),
            ("Both", "Both"),
    )
    
    name = models.CharField(max_length=200, choices=CONTENT_TYPE, null=True, blank=True, default='')
    def __str__(self):
        return self.name
    

class Campaign(models.Model):   
   CAMPAIGN_TYPE = (
        ("Periodic", "Periodic"),
        ("Single", "Single"),
        ("Both", "Both")
    ) 
   CAMPAIGN_STATUS = (
        ("Active", "Active"),
        ("Inactive", "Inactive"),
        ("Completed", "Completed"),
    )
   image = models.ImageField(upload_to='images/', default='', blank=True, null=True)
   brand_manager = models.ForeignKey(BrandManager, on_delete=models.CASCADE, null=True, blank=True, default='')
   campaign_name =  models.CharField(max_length=50, blank=False, null=False, default='', unique=False)
   influencers = models.ManyToManyField('Influencer', blank=True, null=True,  default='')
   budget = models.IntegerField(blank=False, null=False, default=0)
   campaign_type = models.CharField(max_length=20,choices=CAMPAIGN_TYPE, blank=True, null=True, default='Periodic')
   hashtag = models.CharField(max_length=50, blank=True, null=True, default='')
   updated = models.DateField(default=now, null=True, blank=True)
   content_type = models.ManyToManyField('ContentType', blank=True, null=True, default='Post')
   created = models.DateField(default=now, null=False, blank=False)
   ended = models.DateField(default=now, null=False, blank=False)
   
   class Meta:
        ordering = ['-updated', '-created']

   def __str__(self):
        return self.campaign_name
   
#    def get_campaign_type_display(self):
#     return dict(self.campaignType_choices)[self.campaign_type]

#campaigns
    
# class CampaignDetailsWithInfluencer(models.Model): 
#     brandName= models.ForeignKey(Brand, on_delete=models.SET_NULL, null=True) 
#     created= models.DateTimeField(auto_now_add=True)
#     influencerName= models.OneToOneField(Influencer, on_delete=models.CASCADE, blank=True)
#     # influencerUsername =models.ManyToManyField(Influencer, blank=True,  on_delete=models.CASCADE)
#     # cost= models.OneToOneField(Influencer, blank=True, on_delete=models.CASCADE)
#     # linkToPost=
#     postedDate = models.DateTimeField(auto_now_add=True)
#     hashtag = models.OneToOneField(Hashtag, unique=False, blank=False, null=False ,  on_delete=models.CASCADE)
#     image = models.ImageField(upload_to='images/',  default='')
    


# class InfluencerCost(models.Model):
#     username= models.CharField(max_length=100,unique=True, null=False)
#     storyCost= models.IntegerField(blank=False, null=False)
#     postCost= models.IntegerField(blank=False, null=False)
#     updated = models.DateTimeField(auto_now=True)
#     created = models.DateTimeField(auto_now_add=True)

#     class Meta:
#         ordering = ['-updated', '-created']

#     def __str__(self):
#         return self.username



# class BrandReport(models.Model):  
#     active_influencers = models.ManyToManyField(Influencer, blank=True)
#     campaign_count = models.ForeignKey(Campaign, on_delete=models.CASCADE, null=False)
#     # followers = models.ManyToManyField(Influencer, blank=True)
#     # likes = 
#     # shares = 
#     # comments = 
#     # engagementRate = 
#     updated = models.DateTimeField(default=datetime.now)
#     created = models.DateTimeField(default=datetime.now)
       
#     class Meta:
#         ordering = ['-updated', '-created']

#     def __str__(self):
#         return f"{self.campaign_count} ({self.active_influencers.count()} active influencers)"

# class Filter(models.Model):   
#     GENDER_CHOICES = (
#         ('M', 'Male'),
#         ('F', 'Female'),
#         ('O', 'Other'),
#     )

#     gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
#     min_followers = models.IntegerField()
#     max_followers = models.IntegerField()
#     min_age = models.IntegerField()
#     max_age = models.IntegerField()
#     parents = models.BooleanField(default=False)
#     min_children_count = models.IntegerField(null=True, blank=True)
#     max_children_count = models.IntegerField(null=True, blank=True)
#     min_child_age = models.IntegerField(null=True, blank=True)
#     max_child_age = models.IntegerField(null=True, blank=True)
#     brand = models.ForeignKey(Brand, on_delete=models.CASCADE, null=False)
#     hashtag = models.ForeignKey(Hashtag,blank=False, null=False, on_delete=models.CASCADE)
#     updated = models.DateTimeField(auto_now=True)
#     created = models.DateTimeField(auto_now_add=True)
    
#     class Meta:
#         ordering = ['-updated', '-created']

#     def __str__(self):
#         return self.gender



# class Influencer(models.Model):
#     INFLUENCER_INTEREST_CHOICES = (
#         ('Fashion', 'Fashion'),
#         ('Music', 'Music'),
#          ('Food', 'Food'), 
#          ('Health', 'Health'),
#         ('Gaming', 'Gaming'),
#         ('Dance', 'Dance'),
#         ('Entertainment', 'Entertainment'),
#         ('Family', 'Family'),
#          ('Kids', 'Kids'),
#     )
    
#     influencer_username = models.CharField(max_length=20, unique=False)
#     influencer_full_name = models.CharField(max_length=200)
#     influencerChildrenCount = models.IntegerField(blank=True, null=True)
   
#     influencerChildrenAge = models.IntegerField(blank=True, null=True)
#     influencerInfluencerPostCost = models.IntegerField(blank=True, null=True)
#     influencerStoryCost = models.IntegerField(blank=True, null=True)
#     #influencerInterests
  
#     brandmanager = models.ForeignKey(BrandManager, on_delete=models.CASCADE, null=True, unique=False)
#     # influencer_campaign_cost =  models.ForeignKey(InfluencerCost, on_delete=models.SET_NULL, null=True, unique=False)
#     # filters =  models.ForeignKey(Filter, on_delete=models.SET_NULL, null=True, unique=False)
#     created = models.DateTimeField(default=datetime.now)
#     updated = models.DateTimeField(default=timezone.now)
#     image = models.ImageField(upload_to='images/', default='')
#     engagement_rate = models.IntegerField(blank=False, null=True, default=0)

#     class Meta:
#         ordering = ['-updated', '-created']

#     def __str__(self):
#         return self.influencer_username




# class Campaign(models.Model):    
#     campaignType_choices = (
#         ("Periodic", "Periodic"),
#         ("Single", "Single"),
#     )
#     campaignStatus_choices = (
#         ("Active", "Active"),
#         ("Inactive", "Inactive"),
#         ("Completed", "Completed"),
#     )

#     CONTENT_TYPE = (
#         ("Post", "Post"),
#         ("Story", "Story"),
#         ("Both", "Both"),
#     )

#     brand_manager = models.ForeignKey(BrandManager, on_delete=models.CASCADE, null=True)
#     name = models.CharField(max_length=200)
#     hashtag_campaign = models.ForeignKey(Hashtag, blank=True, null=True, unique=False, on_delete=models.CASCADE)
#     # brand = models.ForeignKey(Brand, blank=False, null=False, on_delete=models.CASCADE, default='')
#     campaign_type = models.CharField(max_length=20,choices=campaignType_choices, blank=False, null=False, default='DEFAULT')
#     status = models.CharField(max_length=20,choices=campaignStatus_choices, blank=True, null=True)
#     content_type = models.CharField(max_length=20,choices=content_type, blank=True, null=True)
#     budget = models.IntegerField(blank=False, null=False)
#     start_date = models.DateField(null=True, blank=True)
#     end_date = models.DateField(null=True, blank=True)
#     image = models.ImageField(upload_to='images/', default='')
#     updated = models.DateTimeField(default=datetime.now)
#     created = models.DateTimeField(default=datetime.now)
#     influencers = models.ManyToManyField(Influencer, blank=True)
#     class Meta:
#         ordering = ['-updated', '-created']

#     def __str__(self):
#         return self.name 


# class PRAgency(models.Model):
#     username = models.CharField(max_length=20, unique=True, blank=False, null=False, default='')
#     email = models.EmailField(max_length=254, unique=True, default='')
#     image = models.ImageField(upload_to='images/',  default='')
#     updated = models.DateTimeField(auto_now = True)
#     created = models.DateTimeField(auto_now_add = True)
#     class Meta:
#         ordering = ['-updated', '-created']
        
#     def __str__(self):
#         return self.username

