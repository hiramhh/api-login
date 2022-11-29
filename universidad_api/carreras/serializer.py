# rest_framework
from rest_framework import serializers

# university
from university.serializer import UniversitySerializer

# carreras
from .models import CollegeCareer

class CollegeCareerSerializer(serializers.ModelSerializer):
    university_id = UniversitySerializer

    class Meta:
        model = CollegeCareer
        fields = '__all__'