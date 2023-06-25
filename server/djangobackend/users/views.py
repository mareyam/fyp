from .serializers import UserSerializer, UserLoginSerializer, PRInvitesSerializer
from rest_framework import generics, status
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import render
from django.contrib import messages
from django.views import View
from django.contrib.auth.models import User
import uuid
from django.http import JsonResponse
from .helpers import send_forget_password_mail, send_registration_mail
from users.models import UserAccount
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json
from .models import  TempTokken, PRInvites


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

            user_obj = UserAccount.objects.create(email=email, name=name, role=role, pr_agency=pr_agency)
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
def registered_users_details(request, id, format=None):
        pr_invites = PRInvites.objects.filter(pr_agency_id=id)
        if pr_invites.exists():
            if request.method == 'GET':
                serializer = PRInvitesSerializer(pr_invites, many=True)
                return Response(serializer.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

