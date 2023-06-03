from .serializers import UserSerializer, UserLoginSerializer
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
from .helpers import send_forget_password_mail
from users.models import UserAccount
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json


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
    def get(self, request, token):
        context = {}
        try:
            profile_obj = UserAccount.objects.filter(
                forget_password_token=token).first()
            if profile_obj:
                context['user_id'] = profile_obj.id
            else:
                return JsonResponse({'message': 'Invalid token.'})
        except Exception as e:
            print(e)
            return JsonResponse({'message': 'An error occurred.'})

        return JsonResponse(context)

    def post(self, request, **kwargs):
        try:
            new_password = request.data.get('new_password')
            confirm_password = request.data.get('reconfirm_password')
            user_id = request.data.get('user_id')
            print(new_password)

            if user_id is None:
                return JsonResponse({'message': 'No user id found.'})

            if new_password != confirm_password:
                return JsonResponse({'message': 'Both passwords should be equal.'})

            user_obj = UserAccount.objects.get(id=user_id)
            user_obj.set_password(new_password)
            user_obj.save()
            return JsonResponse({'message': 'Password changed successfully.'})

        except Exception as e:
            print(e)
            return JsonResponse({'message': 'An error occurred.'})

@method_decorator(csrf_exempt, name='dispatch')
class ForgetPasswordView(View):
    def post(self, request):
        try:
            # username = request.data.get('username')
            data = json.loads(request.body)
            username = data.get('username')
            print(username)
            if not UserAccount.objects.filter(username=username).exists():
                return JsonResponse({'message': 'No user found with this username.'})

            user_obj = UserAccount.objects.get(username=username)
            token = str(uuid.uuid4())
            user_obj.forget_password_token = token
            user_obj.save()
            send_forget_password_mail(user_obj.email, token)
            return JsonResponse({'message': 'An email has been sent.'})

        except Exception as e:
            print(e)
            return JsonResponse({'message': 'An error occurred.'})

        return JsonResponse({'message': 'Something went wrong.'})




# class ForgetPasswordView(View):
#     def post(self, request):
#         try:
#             username = request.POST.get('username')

#             if not UserAccount.objects.filter(username=username).exists():
#                 return JsonResponse({'message': 'No user found with this username.'})

#             user_obj = UserAccount.objects.get(username=username)
#             token = str(uuid.uuid4())
#             user_obj.forget_password_token = token
#             user_obj.save()
#             send_forget_password_mail(user_obj.email, token)
#             return JsonResponse({'message': 'An email has been sent.'})

#         except Exception as e:
#             print(e)
#             return JsonResponse({'message': 'An error occurred.'})

#         return JsonResponse({'message': 'Something went wrong.'})

# class AuthUserLoginView(APIView):
#     serializer_class = UserLoginSerializer
#     permission_classes = (AllowAny, )

#     def post(self, request):
#         print(request.data)
#         serializer = self.serializer_class(data=request.data)
#         valid = serializer.is_valid(raise_exception=True)

#         if valid:
#             status_code = status.HTTP_200_OK

#             response = {
#                 'success': True,
#                 'statusCode': status_code,
#                 'message': 'User logged in successfully',
#                 'email': serializer.data['email'],
#                 'role': serializer.data['role']
#               }
#             return Response(response, status=status_code)


# class RegisterView(APIView):
#     def post(self, request):
#         serializer = UserSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response(serializer.data)

# class LoginView(APIView):
#     def post(self, request):
#         email = request.data['email']
#         password = request.data['password']

#         user = User.objects.filter(email=email).first()

#         if user is None:
#             raise AuthenticationFailed('User not found!')

#         if not user.check_password(password):
#             raise AuthenticationFailed('Incorrect password!')

#         payload = {
#             'id': user.id,
#             'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
#             'iat': datetime.datetime.utcnow()
#         }

#         # token = jwt.encode(payload, 'secret', algorithm='HS256').decode('utf-8')
#         token = jwt.encode(payload, 'secret', algorithm='HS256')

#         response = Response()

#         response.set_cookie(key='jwt', value=token, httponly=True)
#         response.data = {
#             'jwt': token
#         }
#         return response

# class UserView(APIView):

#     def get(self, request):
#         token = request.COOKIES.get('jwt')

#         if not token:
#             raise AuthenticationFailed("unauthenticated")

#         try:
#             payload = jwt.decode(token, 'secret', algorithms=['HS256'])

#         except jwt.ExpiredSignatureError:
#             raise AuthenticationFailed('Unauthenticated!')

#         user = User.objects.filter(id=payload['id']).first()
#         serializer = UserSerializer(user)
#         return Response(serializer.data)

# class LogoutView(APIView):
#     def post(self, request):
#         response = Response()
#         response.delete_cookie('jwt')
#         response.data = {
#             'message': 'success logout'
#         }
#         return response
