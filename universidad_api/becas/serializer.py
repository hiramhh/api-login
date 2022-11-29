# rest_framework
from rest_framework import serializers

# becas
from .models import Scholarship

# university
from university.serializer import UniversitySerializer

class ScholarshipSerializer(serializers.ModelSerializer):
    university_id = UniversitySerializer

    class Meta:
        model = Scholarship
        fields = '__all__'