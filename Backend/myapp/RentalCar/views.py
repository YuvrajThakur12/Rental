from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .models import RentalCar
from rest_framework.permissions import IsAuthenticated
from .serializers import RentalCarSerializer
from django.contrib.auth.models import User

class RentalCarView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        data = RentalCar.objects.filter(user=user).all()
        serializer = RentalCarSerializer(data, many=True)
        return Response(serializer.data)

    def post(self, request):
        u = request.user
        serializer = RentalCarSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, pk):
        data = RentalCar.objects.get(id=pk)
        data.delete()                        
        return Response("Deleted")



class getRental(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        if not user.is_staff:
            return Response({'message':"You are not authorized to access this page."},status=status.HTTP_403_FORBIDDEN)

        data = RentalCar.objects.all()
        serializer = RentalCarSerializer(data, many=True)
        return Response(serializer.data)