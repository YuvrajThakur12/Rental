from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class profile (models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    profile_pic = models.ImageField(upload_to='profile_pic', blank=True)
    