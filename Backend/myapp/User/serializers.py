from rest_framework.serializers import ModelSerializer
from .models import profile
from django.contrib.auth.models import User

class UserSerializer(ModelSerializer):
    class Meta:
        model = profile
        fields = '__all__'

        
class userSerializer(ModelSerializer):
    profile = UserSerializer(read_only=True)
    class Meta:
        model = User
        fields = '__all__'