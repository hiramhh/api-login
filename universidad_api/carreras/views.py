# rest framework
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response

# career
from .models import CollegeCareer
from .serializer import CollegeCareerSerializer

# Swagger utils
from drf_yasg.utils import swagger_auto_schema

# My Views.
@swagger_auto_schema(method='GET', operation_description='GET /carreras/ -> Obtener todas las Carreras Universitarias.', responses={status.HTTP_200_OK:CollegeCareerSerializer(many=True)})
@swagger_auto_schema(method='POST', operation_description='POST /carreras/ -> Registrar Nueva Carrera Universitaria.', request_body=CollegeCareerSerializer, responses={status.HTTP_201_CREATED:CollegeCareerSerializer, "message":"New Career Created."})
@api_view(['GET','POST'])
def career_apiview(request):
    """APIView para listar toda la data de la API o para registrar/crear una nueva Carrera Universitaria."""
    
    # queryset:
    try:
        queryset = CollegeCareer.objects.filter(status=True) # se mostrarán todas las carreras activas
    
    except CollegeCareer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer_class = CollegeCareerSerializer(queryset, many=True)

        return Response(serializer_class.data, status=status.HTTP_200_OK)
    
    elif request.method == 'POST':
        serializer_class = CollegeCareerSerializer(data=request.data)

        # verifico los datos recibidos en la request
        if serializer_class.is_valid():
            serializer_class.save() # guardo la data en la bbdd

            return Response(serializer_class.data, status=status.HTTP_201_CREATED)
        else:
            # código de error en la verificación
            return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(method='GET', operation_description='GET /carreras/{_id}/ -> Obtener una Tarea mediante su ID.', responses={status.HTTP_200_OK:CollegeCareerSerializer})    
@swagger_auto_schema(method='PUT', operation_description='PUT /carreras/{_id}/ -> Actualizar una Tarea mediante su ID', request_body=CollegeCareerSerializer)
@swagger_auto_schema(method='DELETE', operation_description='DELETE /carreras/{_id}/ -> Eliminar una Tarea mediante su ID', responses={status.HTTP_204_NO_CONTENT:'College Career Has Been Removed Successfully.'})
@api_view(['GET','PUT','DELETE'])
def career_apiview_detail(request, _id:int):
    """APIView para listar, actualizar o para eliminar toda la data una sola Carrera Universitaria en específico."""

    try:
        career = CollegeCareer.objects.get(pk=_id)
    except CollegeCareer.DoesNotExist:
        return Response({'message':'College Career Not Found.'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer_class = CollegeCareerSerializer(career)

        return Response(serializer_class.data, status=status.HTTP_200_OK)
    
    elif request.method == 'PUT':
        serializer_class = CollegeCareerSerializer(career, data=request.data)

        # verifico los datos recibidos
        if serializer_class.is_valid():
            serializer_class.save() # guardo la data en la bbdd

            return Response(serializer_class.data, status=status.HTTP_200_OK)
        else:
            # código de error en la verificación
            return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)                
        
    elif request.method == 'DELETE':
        career.delete() # elimino la información de la bbdd

        return Response({'message':'College Career Has Been Removed Successfully.'}, status=status.HTTP_204_NO_CONTENT)