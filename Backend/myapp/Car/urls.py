
from django.urls import path
from .views import *

urlpatterns = [
    path('',CarView.as_view()),
    path('<int:pk>', CarView.as_view(), name='car-detail'),
]
