from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils import timezone
from .manager import CustomUserManager
from django.utils.timezone import now
import datetime
import uuid

# Create your models here.
 

class UserAccount(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = (
        ('Admin', 'Admin'),
        ('PRAgency', 'PRAgency'),
        ('BrandManager', 'BrandManager')
    )

    STATUS = (
        ('active','active'),
        ('suspended','suspended')
    )
    
    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'


  # Roles created here
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4, verbose_name='Public Identifier')
    username = models.CharField(max_length=30, blank=True, null=True)
    email = models.EmailField(unique=True)
    image = models.ImageField(upload_to='images/', blank=True, null=True)
    name = models.CharField(max_length=30, blank=True, null=True)
    role = models.CharField(choices=ROLE_CHOICES, max_length=30, blank=True, null=True)
    is_staff = models.BooleanField(
        default=False,
    )
    is_active = models.BooleanField(
        default=True,
    )
    status = models.CharField(choices=STATUS, max_length=30, default='active')
    date_joined = models.DateField(default=now, blank=True, null=True)
    is_deleted = models.BooleanField(default=False, blank=True, null=True)
    created_date = models.DateField(default=now, blank=True, null=True)
    modified_date = models.DateField(default=now, blank=True, null=True)
    brands_managing = models.CharField(max_length=30, blank=True, null=True, default='')
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = CustomUserManager()

    def _str_(self):
            return self.email

class PRInvites(models.Model):
   pr_agency = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='brand_manager')
   brand_manager = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='pr_agency')
   created_at = models.DateTimeField(auto_now_add=True)


class TempTokken(models.Model):
    user = models.OneToOneField(UserAccount, related_name="login_user", on_delete=models.CASCADE)
    token = models.TextField()
    

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
        ('under 5','under 5'),
        ('6-12','6-12'),
        ('13-18','13-18'),
        ('adult','adult'),
        ('None','None')
    ]
    name = models.CharField(max_length=200, choices=CHILD_AGE)
    min_age = models.IntegerField(blank=True, null=True, default=0)
    max_age = models.IntegerField(blank=True, null=True, default=0)
    
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
    username = models.CharField(max_length=20, blank=False, null=False, default='')
    name = models.CharField(max_length=20, blank=True, null=True, default='')
    email = models.EmailField(max_length=20, blank=True, null=True, default='')
    gender = models.CharField(max_length=20,choices=GENDER, blank=True, null=True, default='')
    age = models.IntegerField(blank=True, null=True, default=0)
    followers = models.IntegerField(blank=True, null=True, default=0)
    post_cost = models.IntegerField(blank=True, null=True, default=0)
    engagement_rate = models.IntegerField(blank=True, null=True, default=0)
    isparent = models.CharField(max_length=20,choices=ISPARENT, blank=True, null=True, default="No")
    children_count = models.IntegerField(blank=True, null=True, default=0)
    children_age = models.ManyToManyField('ChildAge', blank=True, default='None')
    interests = models.ManyToManyField('Interest', blank=True, default='Other')

    def __str__(self):
        return self.username




# class User1Manager(BaseUserManager):
#     def create_user(self, email, password=None, **extra_fields):
#         # Create and save a User1 with the given email and password
#         if not email:
#             raise ValueError("The Email field must be set")
#         email = self.normalize_email(email)
#         user = self.model(email=email, **extra_fields)
#         user.set_password(password)
#         user.save(using=self._db)
#         return user

#     def create_superuser(self, email, password=None, **extra_fields):
#         # Create and save a User1 with superuser privileges
#         extra_fields.setdefault('is_staff', True)
#         extra_fields.setdefault('is_superuser', True)
#         return self.create_user(email, password, **extra_fields)

# class User1(AbstractBaseUser):
#     email = models.EmailField(unique=True)
#     # Add your additional fields here

#     # Specify the custom User1Manager for the user model
#     objects = User1Manager()

#     USERNAME_FIELD = 'email'
#     # Add any additional required fields

# class User2Manager(BaseUserManager):
#     def create_user(self, username, password=None, **extra_fields):
#         # Create and save a User2 with the given username and password
#         if not username:
#             raise ValueError("The Username field must be set")
#         user = self.model(username=username, **extra_fields)
#         user.set_password(password)
#         user.save(using=self._db)
#         return user

#     def create_superuser(self, username, password=None, **extra_fields):
#         # Create and save a User2 with superuser privileges
#         extra_fields.setdefault('is_staff', True)
#         extra_fields.setdefault('is_superuser', True)
#         return self.create_user(username, password, **extra_fields)

# class User2(AbstractBaseUser):
#     username = models.CharField(unique=True, max_length=255)
#     # Add your additional fields here

#     # Specify the custom User2Manager for the user model
#     objects = User2Manager()

#     USERNAME_FIELD = 'username'
#     # Add any additional required fields
    
# class User(AbstractBaseUser, PermissionsMixin):
#     class Meta:
#         verbose_name = 'user'
#         verbose_name_plural = 'users'


#   # Roles created here
#     uid = models.UUIDField(unique=True, editable=False, default=uuid.uuid4, verbose_name='Public Identifier')
#     username = models.CharField(max_length=30, blank=True, null=True)
#     password = models.CharField(max_length=30, blank=True, null=True)
#     email = models.EmailField(unique=True)
#     name = models.CharField(max_length=30, blank=True, null=True)
#     role = models.ForeignKey(Role, max_length=30, blank=True, null=True, on_delete=models.CASCADE)
#     date_joined = models.DateField(default=now, blank=True, null=True)
#     is_active = models.BooleanField(default=True, blank=True, null=True)
#     is_staff = models.BooleanField(default=True, blank=True, null=True)
#     is_superuser = models.BooleanField(default=True, blank=True, null=True)
#     is_deleted = models.BooleanField(default=False, blank=True, null=True)
#     created_date = models.DateField(default=now, blank=True, null=True)
#     modified_date = models.DateField(default=now, blank=True, null=True)
    
#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['username']

#     objects = CustomUserManager()

#     def __str__(self):
#             return self.username
    
    # class Role(models.Model):
    # roles = [
    #     ('Admin', 'Admin'),
    #     ('PRAgency', 'PRAgency'),
    #     ('BrandManager', 'BrandManager'), 
    # ]
    # name = models.CharField(max_length=200, choices=roles)

    # def __str__(self):
    #     return str(self.name)
   
  
# from django.db import models
# from django.contrib.auth.models import AbstractUser, Group, Permission

# # Create your models here.
# class User(AbstractUser):
#     name = models.CharField(max_length=255)
#     email = models.CharField(max_length=255, unique=True)
#     password = models.CharField(max_length=255)
#     username = models.CharField(max_length=255)

#     USERNAME_FIELD = 'username'
#     REQUIRED_FIELDS = []
#     groups = models.ManyToManyField(Group, related_name='admin_groups')
#     user_permissions = models.ManyToManyField(Permission, related_name='admin_user_permissions')
    
