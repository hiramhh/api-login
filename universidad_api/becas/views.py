# django
from django.shortcuts import render

# rest_framework
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# becas
from .serializer import ScholarshipSerializer
from .models import Scholarship

# Swagger utils
from drf_yasg.utils import swagger_auto_schema

# My Views.
@swagger_auto_schema(method='GET', operation_description='GET /becas/ -> Obtener todas las Becas.', responses={status.HTTP_200_OK:ScholarshipSerializer(many=True)})
@swagger_auto_schema(method='POST', operation_description='POST /becas/ -> Registrar Nueva Beca.', request_body=ScholarshipSerializer, responses={status.HTTP_201_CREATED:ScholarshipSerializer, "message":"New Scholarship Created."})
@api_view(['GET','POST'])
def scholarship_apiview(request):
    """APIView para listar toda la data de la API o para registrar/crear una nueva Beca."""

    # queryset:
    try:
        queryset = Scholarship.objects.filter(status=True)
    except Scholarship.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer_class = ScholarshipSerializer(queryset, many=True)

        return Response(serializer_class.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        serializer_class = ScholarshipSerializer(data=request.data)

        # verificación de datos recibidos:
        if serializer_class.is_valid():
            serializer_class.save() # guardo la data en la base de datos

            return Response(serializer_class.data, status=status.HTTP_201_CREATED)
        else:
            # error de validación:
            return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(method='GET', operation_description='GET /becas/{_id}/ -> Obtener una Beca mediante su ID.', responses={status.HTTP_200_OK:ScholarshipSerializer})    
@swagger_auto_schema(method='PUT', operation_description='PUT /becas/{_id}/ -> Actualizar una Beca mediante su ID', request_body=ScholarshipSerializer)
@swagger_auto_schema(method='DELETE', operation_description='DELETE /becas/{_id}/ -> Eliminar una Beca mediante su ID', responses={status.HTTP_204_NO_CONTENT:'Scholarship Has Been Removed Successfully.'})
@api_view(['GET','PUT','DELETE'])
def scholarship_apiview_detail(request, _id:int):
    """APIView para listar, actualizar o para eliminar toda la data una sola Beca."""

    # queryset
    try:
        scholarship = Scholarship.objects.get(pk=_id)
    except Scholarship.DoesNotExist:
        return Response({'message':'Scholarship Not Found.'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer_class = ScholarshipSerializer(scholarship)

        return Response(serializer_class.data, status=status.HTTP_200_OK)

    elif request.method == 'PUT':
        serializer_class = ScholarshipSerializer(scholarship, data=request.data)

        # realizo la misma validación de POST:
        if serializer_class.is_valid():
            serializer_class.save() # guardo los datos actualizados en la bbdd

            return Response(serializer_class.data, status=status.HTTP_200_OK)
        else:
            # error en la validación:
            return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.methdo == 'DELETE':
        scholarship.delete() # elimino todos los datos de esa beca de la bbdd

        return Response({'message':'Scholarship Has Been Removed Successfully.'}, status=status.HTTP_204_NO_CONTENT)