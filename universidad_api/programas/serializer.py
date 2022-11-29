# rest_framework
from rest_framework import serializers

# programas
from .models import Programs

# universidad
from university.serializer import UniversitySerializer

class ProgramSerializer(serializers.ModelSerializer):
    university_id = UniversitySerializer

    class Meta:
        model = Programs
        fields = '__all__'