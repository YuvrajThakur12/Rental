from rest_framework.serializers import ModelSerializer
from .models import RentalCar
from Car.serializers import CarSerializer
from django.contrib.auth.models import User

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class RentalCarSerializer(ModelSerializer):
    user = UserSerializer(read_only=True)
    car = CarSerializer(read_only=True)
    class Meta:
        model = RentalCar
        fields = '__all__'

    def create(self, validated_data):
        user = self.context['request'].user
        car_id = self.context['request'].data.get('car')  # Get car ID from request data
        if not car_id:
            raise serializers.ValidationError({"car": "This field is required."})

        # Retrieve the car instance
        from Car.models import Car  # Import here to avoid circular import
        try:
            car = Car.objects.get(id=car_id)
        except Car.DoesNotExist:
            raise serializers.ValidationError({"car": "Invalid car ID."})

        validated_data['user'] = user
        validated_data['car'] = car
        return super().create(validated_data)

