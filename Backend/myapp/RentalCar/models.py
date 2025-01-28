from django.db import models
from django.contrib.auth.models import User
from Car.models import Car
# Create your models here.
class RentalCar(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    car = models.ForeignKey(Car, on_delete=models.CASCADE)
    start_date = models.DateField(auto_now_add=True)
    end_date = models.DateField()
    