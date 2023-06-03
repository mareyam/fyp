from rest_framework import serializers
from .models import UserAccount
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

# class RoleSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Role
#         fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ['email','name', 'username', 'password', 'role']
    def create(self, validated_data):
        user = UserAccount(
            email = validated_data['email'],
            username = validated_data['username'],
            role = validated_data['role'],
            name = validated_data['name']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=128, write_only=True)
    role = serializers.CharField(read_only=True)

    def validate(self, data):
        email = data['email']
        password = data['password']
        print(password)
        user = authenticate(email=email, password=password)

        if user is None:
            raise serializers.ValidationError("Invalid login credentials")

        try:
            validation = {
                'email': user.email,
                'password': user.password,
                'role': user.role,
            }

            return validation
        except UserAccount.DoesNotExist:
            raise serializers.ValidationError("Invalid login credentials 2")
        

          #     extra_kwargs = {
    #         'password': {'write_only': True}
    #     }

    # def create(self, validated_data):
    #     password = validated_data.pop('password', None)
    #     instance = self.Meta.model(**validated_data)
    #     if password is not None:
    #         instance.set_password(password)
    #     instance.save()
    #     return instance