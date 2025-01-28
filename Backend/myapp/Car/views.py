from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Car
from .serializers import CarSerializer

class CarView(APIView):
    def get(self, request, pk=None):
        if pk is None:
            data = Car.objects.all()
            serializer = CarSerializer(data, many=True)
        else:
            try:
                data = Car.objects.get(id=pk)
            except Car.DoesNotExist:
                raise NotFound("Car not found")
            serializer = CarSerializer(data)
        return Response(serializer.data)

    def post(self, request):
        serializer = CarSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, pk):
        
        data = Car.objects.get(id=pk)
        data.delete()
        return Response("Deleted")            
# Create your views here.
