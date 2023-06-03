from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)
from django.contrib import admin
from django.urls import path,include
from .views import *

urlpatterns = [
    path('register/', UserList.as_view(), name="register"),
    path('login/', AuthUserLoginView.as_view(), name="login"),
    path('forget-password/' , ForgetPasswordView.as_view() , name="forget_password"),
    path('change-password/<token>/' , ChangePasswordView.as_view() , name="change_password"),
]

 # path('token/', TokenObtainPairView.as_view(), name="token_obtain_pair"),
    # path('token/refresh', TokenRefreshView.as_view(), name="token_refresh"),
   # path('roles/', views.Role),
    
    

# from django.urls import path
# from .views import UserList, AuthUserLoginView
# # , LoginView, UserView, LogoutView

# urlpatterns = [
#     path('register/', UserList.as_view(), name="register"),
#     path('login/', AuthUserLoginView.as_view(), name="login"),
    
#     # path('login', LoginView.as_view()),
#     # path('user', UserView.as_view()),
#     # path('logout', LogoutView.as_view()),
# ]