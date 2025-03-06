from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import profile
from .serializers import UserSerializer, userSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

class userView(APIView):
    permission_classes = []
    def get(self, request):
        data = profile.objects.all()
        serializer = UserSerializer(data, many=True)
        return Response(serializer.data)

    def post(self, request):
        username = request.data['username']
        password = request.data['password']
        name = request.data['name']
        phone    = request.data['phone']
        profile_pic = request.data['profile_pic']

        user = User.objects.create_user(username=username, password=password)
        p = profile.objects.create(user=user, name=name, phone=phone, profile_pic=profile_pic)

        user.save()
        p.save()

        token, created = Token.objects.get_or_create(user=user)
        return Response({"token":token.key}) 

class login (APIView):
    permission_classes = []
    def post(self, request):
        username = request.data['username']
        password = request.data['password']
        
        if not username or not password:
            return Response("Please provide username and password")
        
        try:
            user = User.objects.get(username=username)
            print(user.is_staff)
        except User.DoesNotExist:
            return Response("Invalid credentials", status=401)
        
        if user.check_password(password):
            token, created = Token.objects.get_or_create(user=user)
            if user.is_staff:
                return Response({"token":token.key, "is_staff": True})
            return Response({"token":token.key, "is_staff": False})
        return Response("Invalid credentials", status=422)
        
class getUser(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        serializer = userSerializer(user)
        return Response(serializer.data)