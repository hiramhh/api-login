# mainApp:
from .models import University, User

# rest_framework:
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id']

class UniversitySerializer(serializers.ModelSerializer):

    user_id = UserSerializer

    class Meta:
        model = University
        fields = '__all__'