
from django.urls import path
from .views import *

urlpatterns = [
    path('',userView.as_view()),
    path('login', login.as_view()),
    path('getUser/', getUser.as_view()),
]
