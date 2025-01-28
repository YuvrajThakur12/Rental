from django.urls import path
from .views import *
urlpatterns = [
    path('',RentalCarView.as_view()),
    path('allrent', getRental.as_view()),
]

