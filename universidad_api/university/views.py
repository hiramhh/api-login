# rest_framework
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# university
from .serializer import UserSerializer, UniversitySerializer
from .models import University, User # models

# Swagger utils
from drf_yasg.utils import swagger_auto_schema

# My Views.
@swagger_auto_schema(method='GET', operation_description='GET /universidad/ -> Listar/Obtener todas las Universidades.', responses={status.HTTP_200_OK:UniversitySerializer(many=True)})
@swagger_auto_schema(method='POST', operation_description='POST /universidad/ -> Registrar Nueva Universidad.',  request_body=UniversitySerializer, responses={status.HTTP_201_CREATED:UniversitySerializer})
@api_view(['GET', 'POST'])
def university_apiview(request):
    """APIView para listar toda la data de la API o para registrar/crear una nueva Universidad."""

    # creando el query
    try:
       queryset = University.objects.all()    
    except University.DoesNotExist:
       return Response({'message':'Not Found.'}, status=status.HTTP_404_NOT_FOUND)        

    if request.method == 'GET':
       serializer_class = UniversitySerializer(queryset, many=True)

       return Response(serializer_class.data, status=status.HTTP_200_OK)        

    elif request.method == 'POST':
        serializer_class = UniversitySerializer(data=request.data)

        # verificando los datos enviados
        if serializer_class.is_valid():
            serializer_class.save() # guardo en la bbdd
            
            return Response(serializer_class.data, status=status.HTTP_201_CREATED)
        else:
            # código de error en la verificación
            return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(method='GET', operation_description='GET /universidad/{_id}/ -> Obtener una Universidad mediante su ID.', responses={status.HTTP_200_OK:UniversitySerializer})    
@swagger_auto_schema(method='PUT', operation_description='PUT /universidad/{_id}/ -> Actualizar una Universidad mediante su ID', request_body=UniversitySerializer, responses={status.HTTP_200_OK:UniversitySerializer})
@swagger_auto_schema(method='DELETE', operation_description='DELETE /universidad/{_id}/ -> Eliminar una Universidad mediante su ID', responses={status.HTTP_204_NO_CONTENT:'University Successfully Removed.'})
@api_view(['GET', 'PUT', 'DELETE'])
def university_apiview_detail(request, _id:int):
    """APIView para listar, actualizar o eliminar toda la data una Universidad en específico."""

    # queryset
    try:
        university = University.objects.get(pk=_id)
    except University.DoesNotExist:
        return Response({'message':'University Not Found.'}, status=status.HTTP_404_NOT_FOUND)    
    
    if request.method == 'GET':
        serializer_class = UniversitySerializer(university)
        
        return Response(serializer_class.data, status=status.HTTP_200_OK)

    elif request.method == 'PUT':
        serializer_class = UniversitySerializer(university, data=request.data)

        # verificando los datos recibidos
        if serializer_class.is_valid():
            serializer_class.save() # guardo los datos actualizados en la bbdd

            return Response(serializer_class.data, status=status.HTTP_200_OK)
        else:
            # código de error en la verificación
            return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        university.delete() #elimino el objeto

        return Response({'message':'University Successfully Removed.'}, status=status.HTTP_204_NO_CONTENT)