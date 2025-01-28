from django.db import models

# Create your models here.
class Car (models.Model):
        name = models.CharField(max_length=100)
        model = models.CharField(max_length=100)
        year = models.IntegerField()
        color = models.CharField(max_length=100)
        price = models.IntegerField()
        pic = models.ImageField(upload_to='pics' , blank=True)

    