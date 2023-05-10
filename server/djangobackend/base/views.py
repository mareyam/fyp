from django.shortcuts import render, redirect
from .models import Campaign,  Brand, BrandManager, Hashtag, SubBrand, Influencer, Interest, ChildAge, ContentType
from .serializers import ContentTypeSerializer, InterestSerializer, ChildAgeSerializer, BrandManagerSerializer, CampaignSerializer, InfluencerSerializer, BrandSerializer, HashtagSerializer, SubBrandSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.exceptions import AuthenticationFailed
from django.shortcuts import render, redirect
import jwt
from datetime import datetime
from rest_framework.views import APIView
import praw
from django.conf import settings
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from .views import get_reddit_client


# def get_reddit_client():
#     return praw.Reddit(
#         REDDIT_CLIENT_ID='6wABWkSBiiHlVto8dtuIyw',
#         REDDIT_CLIENT_SECRET='1_aSQgctipLRJxg1YAnnAvIDdzEbmw',
#         REDDIT_USER_AGENT='python:Brandsense:v0.0.1 (by /u/General-Ad-2540)'
#     )


# @api_view(['GET', 'POST'])
# def testapi(request, format=None):

#     reddit = get_reddit_client()
#     subreddit = reddit.subreddit("python")
#     posts = subreddit.hot(limit=10)

    
#     if request.method == 'GET':
#         posts = reddit.objects.all()
#         serializer = RedditSerializer(posts, many=True)
#         return Response(serializer.data)
    
#     if request.method == 'POST':
#         serializer = RedditSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
        
# @api_view(['GET', 'POST'])
# def testapi(request, format=None):
#     # Retrieve the 10 hottest posts from the python subreddit using the PRAW Reddit object
#     reddit = get_reddit_client()
#     subreddit = reddit.subreddit("python")
#     posts = subreddit.hot(limit=10)

#     # Store each post in the database if it doesn't already exist
#     for post in posts:
#         if not reddit.objects.filter(id=post.id).exists():
#             reddit.objects.create(
#                 id=post.id,
#                 title=post.title,
#                 url=post.url,
#                 subreddit=post.subreddit.display_name,
#                 created_at=post.created_utc,
#             )

#     # Retrieve all RedditPost objects from the database and pass them to the template for display
#     posts = reddit.objects.all()
#     return render(request, "index.html", {"posts": posts})

@api_view(['GET', 'POST'])
def active_campaigns(request, format=None):
    
    if request.method == 'GET':
    #  campaigns = Campaign.objects.filter(status='Active').all()
     campaigns = Campaign.objects.all()
     serializer = CampaignSerializer(campaigns, many=True)
     return Response(serializer.data)
    
    if request.method == 'POST':
     serializer = CampaignSerializer(data=request.data)
     if serializer.is_valid():
         serializer.save()
         return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'DELETE'])
def activecampaign_detail(request, id, format=None):
    try:
        campaign = Campaign.objects.get(pk=id)
    except Campaign.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CampaignSerializer(campaign)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = CampaignSerializer(campaign, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        campaign.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def inactivecampaigns(request, format=None):
    
    if request.method == 'GET':
     campaigns = Campaign.objects.filter(status='Inactive').all()
    #  campaigns = Campaign.objects.all()
     serializer = CampaignSerializer(campaigns, many=True)
     return Response(serializer.data)
    
    if request.method == 'POST':
     serializer = CampaignSerializer(data=request.data)
     if serializer.is_valid():
         serializer.save()
         return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'DELETE'])
def inactivecampaign_detail(request, id, format=None):
    try:
        campaign = Campaign.objects.get(pk=id)
    except Campaign.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CampaignSerializer(campaign)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = CampaignSerializer(campaign, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        campaign.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def brandmanagers(request, format=None):
    if request.method == 'GET':
     brandmanager = BrandManager.objects.all()
     serializer = BrandManagerSerializer(brandmanager, many=True)
     return Response(serializer.data)
    
    if request.method == 'POST':
     serializer = BrandManagerSerializer(data=request.data)
     if serializer.is_valid():
         serializer.save()
         return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'DELETE'])
def brandmanager_detail(request, id, format=None):

    try:
        brandmanager = BrandManager.objects.get(pk=id)
    except brandmanager.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = BrandManagerSerializer(brandmanager)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = BrandManagerSerializer(brandmanager, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        brandmanager.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def subbrands(request, format=None):
    if request.method == 'GET':
     subbrand = SubBrand.objects.all()
     serializer = SubBrandSerializer(subbrand, many=True)
     return Response(serializer.data)
    
    if request.method == 'POST':
     serializer = SubBrandSerializer(data=request.data)
     if serializer.is_valid():
         serializer.save()
         return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'DELETE'])
def subbrand_detail(request, id, format=None):

    try:
        subbrand = SubBrand.objects.get(pk=id)
    except subbrand.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = SubBrandSerializer(subbrand)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = SubBrandSerializer(subbrand, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        subbrand.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def interests(request, format=None):
    if request.method == 'GET':
     interest = Interest.objects.all()
     serializer = InterestSerializer(interest, many=True)
     return Response(serializer.data)
    
    if request.method == 'POST':
     serializer = InterestSerializer(data=request.data)
     if serializer.is_valid():
         serializer.save()
         return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'DELETE'])
def interest_detail(request, id, format=None):

    try:
        interest = Interest.objects.get(pk=id)
    except Interest.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = InterestSerializer(interest)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = InterestSerializer(interest, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        interest.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def childage(request, format=None):
    if request.method == 'GET':
     childage = ChildAge.objects.all()
     serializer = ChildAgeSerializer(childage, many=True)
     return Response(serializer.data)
    
    if request.method == 'POST':
     serializer = ChildAgeSerializer(data=request.data)
     if serializer.is_valid():
         serializer.save()
         return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'DELETE'])
def childage_detail(request, id, format=None):

    try:
        childage = ChildAge.objects.get(pk=id)
    except childage.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ChildAgeSerializer(childage)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ChildAgeSerializer(childage, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        childage.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def contenttypes(request, format=None):
    if request.method == 'GET':
     contentType = ContentType.objects.all()
     serializer = ContentTypeSerializer(contentType, many=True)
     return Response(serializer.data)
    
    if request.method == 'POST':
     serializer = ContentTypeSerializer(data=request.data)
     if serializer.is_valid():
         serializer.save()
         return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'DELETE'])
def contenttype_detail(request, id, format=None):

    try:
        contentType = ContentType.objects.get(pk=id)
    except contentType.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ContentTypeSerializer(contentType)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ContentTypeSerializer(contentType, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        contentType.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def influencers(request, format=None):
    if request.method == 'GET':
     influencer = Influencer.objects.all()
     serializer = InfluencerSerializer(influencer, many=True)
     return Response(serializer.data)
    
    if request.method == 'POST':
     serializer = InfluencerSerializer(data=request.data)
     if serializer.is_valid():
         serializer.save()
         return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'DELETE'])
def influencer_detail(request, id, format=None):

    try:
        influencer = Influencer.objects.get(pk=id)
    except influencer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = InfluencerSerializer(influencer)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = InfluencerSerializer(influencer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        influencer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def brands(request, format=None):
    if request.method == 'GET':
     brand = Brand.objects.all()
     serializer = BrandSerializer(brand, many=True)
     return Response(serializer.data)
    
    if request.method == 'POST':
     serializer = BrandSerializer(data=request.data)
     if serializer.is_valid():
         serializer.save()
         return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'DELETE'])
def brand_detail(request, id, format=None):

    try:
        brand = Brand.objects.get(pk=id)
    except brand.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = BrandSerializer(brand)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = BrandSerializer(brand, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        brand.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def hashtags(request, format=None):
    if request.method == 'GET':
     hashtag = Hashtag.objects.all()
     serializer = HashtagSerializer(hashtag, many=True)
     return Response(serializer.data)
    
    if request.method == 'POST':
     serializer = HashtagSerializer(data=request.data)
     if serializer.is_valid():
         serializer.save()
         return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'DELETE'])
def hashtag_detail(request, id, format=None):

    try:
        hashtag = Hashtag.objects.get(pk=id)
    except hashtag.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = HashtagSerializer(hashtag)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = HashtagSerializer(hashtag, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        hashtag.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


        

        
# class Register(APIView):
#     def post(self, request):
#         serializer=UserSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response(serializer.data)

# class Login(APIView):
#     def post(self, request):
#         email=request.data.get('email')
#         password=request.data.get('password')

#         user=User.objects.filter(email=email).first()

#         if user is None:
#             raise AuthenticationFailed("user does not exist")
#         if not user.check_password(password):
#             raise AuthenticationFailed("password is incorrect")
#         payload={
#            "id": user.id,
#             "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
#             "iat": datetime.datetime.utcnow()
#         }
#         token = jwt.encode(payload,"secret", algorithm="HS256").decode("utf8")
#         response=Response()
#         response.set_cookie(key="jwt", value=token, httponly=True)
#         return Response({
#     'jwt': token,
# })
#     class User(APIView):
#         def get(self, request):
#             token = request.COOKIES.get('jwt')
#             if not token:
#                 raise AuthenticationFailed("Unauthenticated token")

#             try:
#                 payload = jwt.decode(token, "secret", algorithms=["HS256"])
#             except jwt.ExpiredSignatureError:
#                 raise AuthenticationFailed("Unauthorized token")

#             user = User.objects.get(id=payload['id'])
#             serializer = UserSerializer(user)
#             return Response(serializer.data)

# class Logout(APIView):
#         def post(self,request):
#             response=Response()
#             response.delete_cookie("jwt")
#             response.data={
#                 "message": "success",
#             }
#             return response




# @api_view(['GET', 'POST'])
# def active_campaigns(request, format=None):
    
#     if request.method == 'GET':
#      campaigns = Campaign.objects.all()
#      serializer = CampaignSerializer(campaigns, many=True)
#      return Response(serializer.data)
    
#     if request.method == 'POST':
#      serializer = CampaignSerializer(data=request.data)
#      if serializer.is_valid():
#          serializer.save()
#          return Response(serializer.data, status=status.HTTP_201_CREATED)

# @api_view(['GET', 'PUT', 'DELETE'])
# def activecampaign_detail(request, id, format=None):
#     try:
#         campaign = Campaign.objects.get(pk=id)
#     except Campaign.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     if request.method == 'GET':
#         serializer = CampaignSerializer(campaign)
#         return Response(serializer.data)

#     elif request.method == 'PUT':
#         serializer = CampaignSerializer(campaign, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     elif request.method == 'DELETE':
#         campaign.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)







# @api_view(['GET', 'POST'])
# def new_influencers(request, format=None):
#     if request.method == 'GET':
#      influencer = NewInfluencer.objects.all()
#      serializer = NewInfluencerSerializer(influencer, many=True)
#      return Response(serializer.data)
    
#     if request.method == 'POST':
#      serializer = NewInfluencerSerializer(data=request.data)
#      if serializer.is_valid():
#          serializer.save()
#          return Response(serializer.data, status=status.HTTP_201_CREATED)

# @api_view(['GET', 'PUT', 'DELETE'])
# def new_influencer_detail(request, id, format=None):

#     try:
#         influencer = NewInfluencer.objects.get(pk=id)
#     except influencer.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     if request.method == 'GET':
#         serializer = NewInfluencerSerializer(influencer)
#         return Response(serializer.data)

#     elif request.method == 'PUT':
#         serializer = NewInfluencerSerializer(influencer, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     elif request.method == 'DELETE':
#         influencer.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)





# @api_view(['GET', 'POST'])
# def filters(request, format=None):
#     if request.method == 'GET':
#      filter = Filter.objects.all()
#      serializer = FilterSerializer(filter, many=True)
#      return Response(serializer.data)
    
#     if request.method == 'POST':
#      serializer = FilterSerializer(data=request.data)
#      if serializer.is_valid():
#          serializer.save()
#          return Response(serializer.data, status=status.HTTP_201_CREATED)

# @api_view(['GET', 'PUT', 'DELETE'])
# def filter_detail(request, id, format=None):

#     try:
#         filter = Filter.objects.get(pk=id)
#     except filter.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     if request.method == 'GET':
#         serializer = FilterSerializer(filter)
#         return Response(serializer.data)

#     elif request.method == 'PUT':
#         serializer = FilterSerializer(filter, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     elif request.method == 'DELETE':
#         filter.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)


# @api_view(['GET', 'POST'])
# def pragencys(request, format=None):
#     if request.method == 'GET':
#      pragency = PRAgency.objects.all()
#      serializer = PRAgencySerializer(pragency, many=True)
#      return Response(serializer.data)
    
#     if request.method == 'POST':
#      serializer = PRAgencySerializer(data=request.data)
#      if serializer.is_valid():
#          serializer.save()
#          return Response(serializer.data, status=status.HTTP_201_CREATED)

# @api_view(['GET', 'PUT', 'DELETE'])
# def pragency_detail(request, id, format=None):

#     try:
#         pragency = PRAgency.objects.get(pk=id)
#     except pragency.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     if request.method == 'GET':
#         serializer = PRAgencySerializer(pragency)
#         return Response(serializer.data)

#     elif request.method == 'PUT':
#         serializer = PRAgencySerializer(pragency, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     elif request.method == 'DELETE':
#         pragency.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

# @api_view(['GET', 'POST'])
# def brandreports(request, format=None):
#     if request.method == 'GET':
#      report = report.objects.all()
#      serializer = BrandReportSerializer(report, many=True)
#      return Response(serializer.data)
    
#     if request.method == 'POST':
#      serializer = BrandReportSerializer(data=request.data)
#      if serializer.is_valid():
#          serializer.save()
#          return Response(serializer.data, status=status.HTTP_201_CREATED)

# @api_view(['GET', 'PUT', 'DELETE'])
# def brandreport_detail(request, id, format=None):

#     try:
#         report = report.objects.get(pk=id)
#     except report.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     if request.method == 'GET':
#         serializer = BrandReportSerializer(report)
#         return Response(serializer.data)

#     elif request.method == 'PUT':
#         serializer = BrandReportSerializer(report, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     elif request.method == 'DELETE':
#         report.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

#Campaigns
# def campaign(request,pk):
#     campaign = Campaign.objects.get(id=pk)
#     context = {'campaign':campaign}
#     return render(request, 'base/campaigns/campaign.html',context)

# def campaigns(request):
#      campaigns = Campaign.objects.all()
#      campaign_data = list(campaigns.values())
#      return JsonResponse({'campaigns': campaign_data})


# def campaigns(request):
#      campaigns = Campaign.objects.all()
#      return render(request, 'base/campaigns/campaigns.html', {'campaigns':campaigns})

# def createCampaign(request):
#     form = CampaignForm()
#     if request.method == 'POST':
#         form = CampaignForm(request.POST)
#         if form.is_valid():
#             form.save()
#             return redirect('campaigns')
#     context = {'form':form}
#     return render(request, 'base/campaigns/campaign_form.html', context)

# def updateCampaign(request,pk):
#     room = Campaign.objects.get(id=pk)
#     form = CampaignForm(instance=room)
#     if request.method == "POST":
#         form = RoomForm(request.POST, instance=room)
#         if form.is_valid():
#             form.save()
#             return redirect('campaigns')
#     context = {'form':form}
#     return render(request, 'base/campaigns/campaign_form.html', context)

# def deleteCampaign(request,pk):
#     campaign = Campaign.objects.get(id=pk)
#     if request.method == "POST":
#         campaign.delete()
#         return redirect('campaigns')
#     return render(request, 'base/campaigns/campaign_form.html', {'obj':campaign})



#brand
# def brand(request,pk):
#     brand = Brand.objects.get(id=pk)
#     context = {'brand':brand}
#     return render(request, 'base/brand/brand.html',context)

# def brands(request):
#     brands = Brand.objects.all()
#     brand_count = brands.count()
#     context = {'brands':brands, 'brands':brands}
#     return render(request, 'base/brand/brands.html', context)

# def createBrand(request):
#     form = BrandForm()
#     if request.method == 'POST':
#         form = BrandForm(request.POST)
#         if form.is_valid():
#             form.save()
#             return redirect('brands')
#     context = {'form':form}
#     return render(request, 'base/brand/brand_form.html', context)

# def updateBrand(request,pk):
#     brand = Brand.objects.get(id=pk)
#     form = BrandForm(instance=brand)
#     if request.method == "POST":
#         form = BrandForm(request.POST, instance=brand)
#         if form.is_valid():
#             form.save()
#             return redirect('brands')
#     context = {'form':form}
#     return render(request, 'base/brand/brand_form.html', context)

# def deleteBrand(request,pk):
#     brand = Brand.objects.get(id=pk)
#     if request.method == "POST":
#         brand.delete()
#         return redirect('brands')
#     return render(request, 'base/brand/brand_form.html', {'obj':brand})

#brandManager
# def brandManager(request,pk):
#     brandmanager = BrandManager.objects.filter(id=pk).values()
#     return JsonResponse({'brandmanager': list(brandmanager)})    
#     # brandManager = BrandManager.objects.get(id=pk)
#     # context = {'brandManager':brandManager}
#     # return render(request, 'base/brandManager/brandManager.html',context)

# def brandManagers(request):
#     brandmanagers = BrandManager.objects.all()
#     brandmanager_data = list(brandmanagers.values())
#     return JsonResponse({'brandmanagers': brandmanager_data})
#     # brandManagers = BrandManager.objects.all()
#     # brandManager_count = brandManagers.count()
#     # context = {'brandManagers':brandManagers, 'brandManagers':brandManagers}
#     # return render(request, 'base/brand/brandManagers.html', context)



# def createBrandManager(request):
#     form = BrandManagerForm()
#     if request.method == 'POST':
#         form = BrandManagerForm(request.POST)
#         if form.is_valid():
#             form.save()
#             return redirect('brandManagers')
#     context = {'form':form}
#     return render(request, 'base/brandManager/brandManager_form.html', context)

# def updateBrandManager(request,pk):
#     brandManager = BrandManager.objects.get(id=pk)
#     form = BrandManagerForm(instance=brandManager)
#     if request.method == "POST":
#         form = BrandManagerForm(request.POST, instance=brandManager)
#         if form.is_valid():
#             form.save()
#             return redirect('brandManagers')
#     context = {'form':form}
#     return render(request, 'base/brandManager/brandManager_form.html', context)

# def deleteBrandManager(request,pk):
#     brandManager = BrandManager.objects.get(id=pk)
#     if request.method == "POST":
#         brandManager.delete()
#         return redirect('brandManagers')
#     return render(request, 'base/brandManager/brandManager_form.html', {'obj':brandManager})

#Influencer
# def influencer(request,pk):
#     influencer = Influencer.objects.get(id=pk)
#     context = {'influencer':influencer}
#     return render(request, 'base/influencers/influencer.html',context)

# def influencers(request):
#     influencers = Influencer.objects.all()
#     influencer_count = influencers.count()
#     context = {'influencers':influencers, 'influencers':influencers}
#     return render(request, 'base/influencers/influencers.html', context)

# def createInfluencer(request):
#     form = InfluencerForm()
#     if request.method == 'POST':
#         form = InfluencerForm(request.POST)
#         if form.is_valid():
#             form.save()
#             return redirect('influencers')
#     context = {'form':form}
#     return render(request, 'base/influencers/influencer_form.html', context)

# def updateInfluencer(request,pk):
#     influencer = Influencer.objects.get(id=pk)
#     form = InfluencerForm(instance=influencer)
#     if request.method == "POST":
#         form = InfluencerForm(request.POST, instance=influencer)
#         if form.is_valid():
#             form.save()
#             return redirect('influencers')
#     context = {'form':form}
#     return render(request, 'base/influencers/influencer_form.html', context)

# def deleteInfluencer(request,pk):
#     influencer = Influencer.objects.get(id=pk)
#     if request.method == "POST":
#         influencer.delete()
#         return redirect('influencers')
#     return render(request, 'base/influencers/influencer_form.html', {'obj':influencer})


#PRAgency
# def pragency(request,pk):
#     pragency = PRAgency.objects.get(id=pk)
#     context = {'pragency':pragency}
#     return render(request, 'base/PRAgency/pragency.html',context)

# def PRAgencys(request):
#     pragencys = PRAgency.objects.all()
#     pragency_count = pragencys.count()
#     context = {'pragencys':pragencys, 'pragencys':pragencys}
#     return render(request, 'base/PRAgency/pragencys.html', context)

# def createPRAgency(request):
#     form = PRAgencyForm()
#     if request.method == 'POST':
#         form = PRAgencyForm(request.POST, files=request.FILES)
#         if form.is_valid():
#             form.save()
#             return redirect('pragencys')
#     context = {'form':form}
#     return render(request, 'base/PRAgency/pragency_form.html', context)

# def updatePRAgency(request,pk):
#     PRAgency = PRAgency.objects.get(id=pk)
#     form = PRAgencyForm(instance=PRAgency)
#     if request.method == "POST":
#         form = PRAgencyForm(request.POST, instance=PRAgency)
#         if form.is_valid():
#             form.save()
#             return redirect('PRAgencys')
#     context = {'form':form}
#     return render(request, 'base/PRAgency/pragency_form.html', context)

# def deletePRAgency(request,pk):
#     PRAgency = PRAgency.objects.get(id=pk)
#     if request.method == "POST":
#         PRAgency.delete()
#         return redirect('PRAgencys')
#     return render(request, 'base/PRAgency/pragency_form.html', {'obj':PRAgency})


# #Hashtags
# def hashtag(request,pk):
#     hashtag = Hashtag.objects.get(id=pk)
#     context = {'hashtag':hashtag}
#     return render(request, 'base/hashtag/hashtag.html',context)

# def hashtags(request):
#     hashtags = Hashtag.objects.all()
#     hashtag_count = hashtags.count()
#     context = {'hashtags':hashtags, 'hashtags':hashtags}
#     return render(request, 'base/hashtag/hashtags.html', context)

# def createHashtag(request):
#     form = HashtagForm()
#     if request.method == 'POST':
#         form = HashtagForm(request.POST)
#         if form.is_valid():
#             form.save()
#             return redirect('hashtags')
#     context = {'form':form}
#     return render(request, 'base/hashtag/hashtag_form.html', context)

# def updateHashtag(request,pk):
#     hashtag = Hashtag.objects.get(id=pk)
#     form = HashtagForm(instance=hashtag)
#     if request.method == "POST":
#         form = HashtagForm(request.POST, instance=hashtag)
#         if form.is_valid():
#             form.save()
#             return redirect('hashtags')
#     context = {'form':form}
#     return render(request, 'base/hashtag/hashtag_form.html', context)

# def deleteHashtag(request,pk):
#     hashtag = Hashtag.objects.get(id=pk)
#     if request.method == "POST":
#         hashtag.delete()
#         return redirect('hashtags')
#     return render(request, 'base/hashtag/hashtag_form.html', {'obj':hashtag})


# #Filters
# def filters(request):
#     filters = Filter.objects.all()
#     filter_count = filters.count()
#     context = {'filters':filters, 'filters':filters}
#     return render(request, 'base/filters/filters.html', context)

# def createFilter(request):
#     form = FilterForm()
#     if request.method == 'POST':
#         form = FilterForm(request.POST)
#         if form.is_valid():
#             form.save()
#             return redirect('filters')
#     context = {'form':form}
#     return render(request, 'base/filters/filter_form.html', context)

# def updateFilter(request,pk):
#     filter = Filter.objects.get(id=pk)
#     form = FilterForm(instance=filter)
#     if request.method == "POST":
#         form = FilterForm(request.POST, instance=filter)
#         if form.is_valid():
#             form.save()
#             return redirect('filters')
#     context = {'form':form}
#     return render(request, 'base/filters/filter_form.html', context)

# def deleteFilter(request,pk):
#     filter = Filter.objects.get(id=pk)
#     if request.method == "POST":
#         filter.delete()
#         return redirect('filters')
#     return render(request, 'base/filter/filter_form.html', {'obj':filter})

# Create your views here.

# class RegisterView(APIView):
#     def post(self, request):
#         serializer = UserSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response(serializer.data)

# def LoginView(APIView):
#     def post(self, request):
#         email = request.data['email']
#         password = request.data['password']

#         user = User.objects.filter(email=email).first()

#         if user is None:
#             raise AuthenticationFailed('user not failed')
        
#         if not user.check_password(password):
#             raise AuthenticationFailed('Incorrect password')
    
#         payload = {
#             'id':user.id,
#             'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
#             'iat': datetime.datetime.utcnow() 
#         }

        
#         return Response({
#             'message':'success'
#         })

