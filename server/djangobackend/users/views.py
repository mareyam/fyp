from .serializers import UserSerializer, UserLoginSerializer, PRInvitesSerializer, InfluencerSerializer, InterestSerializer, ChildAgeSerializer
from rest_framework import generics, status
from rest_framework.permissions import  AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.response import Response
from django.views import View
import uuid
from django.http import JsonResponse
from .helpers import send_forget_password_mail, send_registration_mail
from users.models import UserAccount, Influencer
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json
from .models import  TempTokken, PRInvites, Influencer, Interest, ChildAge
from django.contrib.auth import logout
# from rest_framework.permissions import IsAuthenticated
# from .permissions import IsAdminOrPRUser
# @permission_classes([IsAuthenticated, IsAdminOrPRUser])
# Create your views here.


class UserList(generics.ListCreateAPIView):
    queryset = UserAccount.objects.all()
    serializer_class = UserSerializer

class AuthUserLoginView(APIView):
    serializer_class = UserLoginSerializer
    permission_classes = (AllowAny, )

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        print(email, password)
        serializer = self.serializer_class(
            data={'email': email, 'password': password})
        valid = serializer.is_valid(raise_exception=True)

        # Perform your login logic with email and password

        if valid:
            status_code = status.HTTP_200_OK
        response = {
            'success': True,
            'statusCode': status_code,
            'message': 'User logged in successfully',
            'email': email,
            'role': serializer.data['role']
        }
        return Response(response, status=status_code)

def logout(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({'message': 'Password changed successfully.'})   
     
class ChangePasswordView(APIView):
     def post(self, request, **kwargs):
        context = {}
        try:
            token_obj = TempTokken.objects.get(token= kwargs.get('token'))
            user_obj = token_obj.user

            print(user_obj)
            new_password = request.data.get('new_password')
            confirm_password = request.data.get('reconfirm_password')
            if new_password != confirm_password:
                return JsonResponse({'message': 'Both passwords should be equal.'})

            user_obj.set_password(new_password)
            user_obj.save()
            token_obj.delete()
            return JsonResponse({'message': 'Password changed successfully.'})
        except Exception as e:
            print(e)
            return JsonResponse({'message': 'An error occurred.'})
            
@method_decorator(csrf_exempt, name='dispatch')
class ForgetPasswordView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            email = data.get('email')
            if not UserAccount.objects.filter(email=email).exists():
                return JsonResponse({'message': 'No user found with this email.'})

            user_obj = UserAccount.objects.get(email=email)
            token = str(uuid.uuid4())
            try:
                temp_obj = TempTokken.objects.get(user= user_obj)
                temp_obj.token = token
                print(temp_obj.token)
                temp_obj.save()
            except Exception:
                TempTokken.objects.create(user=user_obj, token=token)
            
            send_forget_password_mail(user_obj.email, token)
            return JsonResponse({'message': 'An email has been sent.'})

        except Exception as e:
            print(e)
            return JsonResponse({'message': 'An error occurred.'})

        return JsonResponse({'message': 'Something went wrong.'})

@method_decorator(csrf_exempt, name='dispatch')
class InviteUserEmailSent(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            pr_agency = data.get('pr_agency')
            email = data.get('email')
            name = data.get('name')
            role = data.get('role')

            # if not UserAccount.objects.filter(email=email).exists():
            #     return JsonResponse({'message': 'No user found with this email.'})

            user_obj = UserAccount.objects.create(email=email, name=name, role=role)
            PRInvites.objects.create(pr_agency_id = pr_agency, brand_manager_id = user_obj.id)
            token = str(uuid.uuid4())
            try:
                temp_obj = TempTokken.objects.get(user= user_obj)
                temp_obj.token = token
                print(temp_obj.token)
                temp_obj.save()
            except Exception:
                TempTokken.objects.create(user=user_obj, token=token)
            
            send_registration_mail(user_obj.email, token)
            return JsonResponse({'message': 'An email has been sent.'})

        except Exception as e:
            print(e)
            return JsonResponse({'message': 'An error occurred.'})

        return JsonResponse({'message': 'Something went wrong.'})

class InviteUserCreateAccountView(APIView):
    def post(self, request, **kwargs):
        context = {}
        try:
            token_obj = TempTokken.objects.get(token= kwargs.get('token'))
            user_obj = token_obj.user
            pr_agency = user_obj.pr_agency  # Retrieve the pr agency ID associated with the user
            # pr_agency = request.get('pr_agency')

            print(user_obj)
            new_password = request.data.get('new_password')
            confirm_password = request.data.get('reconfirm_password')
            username = request.data.get('username')

            print("user details are"+new_password+confirm_password+username)

            if new_password != confirm_password or not username:
                return JsonResponse({'message': 'Both passwords should match or username is null.'})

            user_obj.set_password(new_password)
            user_obj.username = username
            user_obj.save()
            token_obj.delete()
            return JsonResponse({'message': 'Account created successfully.'})
        except Exception as e:
            print(e)
            return JsonResponse({'message': 'An error occurred.'})

@api_view(['GET'])
def pr_invited_brandmanager_id(request, id, format=None):
        pr_invites = PRInvites.objects.filter(pr_agency_id=id)
        if pr_invites.exists():
            if request.method == 'GET':
                serializer = PRInvitesSerializer(pr_invites, many=True)
                response_data = [item['brand_manager'] for item in serializer.data]
                return Response(response_data)
               
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def all_pr_invited_brandmanagers(request,format=None):
        pr_invites = PRInvites.objects.all()
        if pr_invites.exists():
            if request.method == 'GET':
                serializer = PRInvitesSerializer(pr_invites, many=True)
                return Response(serializer.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

# not implemented
class instagram_signup(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            #from instagram
            username = data.get('username')
            name = data.get('name')
            # followers = data.get('followers')
            
            #entered by influencer
            gender = data.get('gender')
            age = data.get('age')
            post_cost = data.get('post_cost')
            children_age = data.get('children_age')
            children_count = data.get('children_count')
            interests = data.get('interests')

            influencer = Influencer.objects.create(username=username, name=name,
                                                  gender=gender, age=age,
                                                  post_cost=post_cost, children_age=children_age, children_count=children_count,
                                                  interests=interests)
            influencer.save()
        except Exception:
            print(e)
            return JsonResponse({'message': 'An error occurred.'})

        return JsonResponse({'message': 'Something went wrong.'})

@api_view(['GET', 'POST'])
def influencers(request,  format=None):
        influencers = Influencer.objects.all()
        if influencers.exists():
            if request.method == 'GET':
                serializer = InfluencerSerializer(influencers, many=True)
                return Response(serializer.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        if request.method == 'POST':
         serializer = InfluencerSerializer(data=request.data)
         if serializer.is_valid():
          serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


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















# # ////////////////registration
# class RedditSignup(View):
#     def get(self, request):
#         reddit = praw.Reddit(client_id=settings.REDDIT_CLIENT_ID,
#                              client_secret=settings.REDDIT_CLIENT_SECRET,
#                              redirect_uri=settings.REDDIT_REDIRECT_URI,
#                              user_agent='MyApp/0.1')

#         # Generate the Reddit OAuth2 URL
#         auth_url = reddit.auth.url(['identity', 'submit'], 'unique_state', 'permanent')

#         # Return the authorization URL in the response
#         response_data = {
#             'auth_url': auth_url,
#             'message': 'Successfully generated Reddit signup URL.'
#         }
#         return JsonResponse(response_data)

# class RedditCallbackView(View):
#     def get(self, request):
#         reddit = praw.Reddit(client_id=settings.REDDIT_CLIENT_ID,
#                              client_secret=settings.REDDIT_CLIENT_SECRET,
#                              redirect_uri=settings.REDDIT_REDIRECT_URI,
#                              user_agent='MyApp/0.1')

#         # Retrieve the access token using the authorization code
#         state = request.GET.get('state', '')
#         code = request.GET.get('code', '')
#         reddit.auth.authorize(code)

#         # Get user details using the access token
#         user = reddit.user.me()

#         # Perform necessary actions with the user details
#         # (e.g., create a user account, log in the user, etc.)

#         # Return user details in the response
#         response_data = {
#             'username': user.name,
#             'email': user.email,
#             'message': 'Successfully retrieved user details from Reddit.'
#         }
#         return JsonResponse(response_data)


# # ////////////////Login
# class RedditLoginForm(forms.Form):
#     state = forms.CharField(widget=forms.HiddenInput())
#     code = forms.CharField(widget=forms.HiddenInput())

# class RedditSignin(View):
#     def get(self, request):
#         form = RedditLoginForm(request.GET)
#         if form.is_valid():
#             state = form.cleaned_data['state']
#             code = form.cleaned_data['code']

#             reddit = praw.Reddit(client_id=settings.REDDIT_CLIENT_ID,
#                                  client_secret=settings.REDDIT_CLIENT_SECRET,
#                                  redirect_uri=settings.REDDIT_REDIRECT_URI,
#                                  user_agent='MyApp/0.1')

#             reddit.auth.authorize(code)

#             user = reddit.user.me()

#             # Perform necessary actions with the user details
#             # (e.g., create a user account, log in the user, etc.)

#             return redirect('success-page')
#         else:
#             return redirect('login-page')

# class RedditSignInView(FormView):
#     template_name = 'reddit_login.html'
#     form_class = RedditLoginForm
#     success_url = '/auth/complete/reddit/'

#     def get_initial(self):
#         return {'state': self.request.GET.get('state', ''), 'code': self.request.GET.get('code', '')}
