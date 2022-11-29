# rest_framework 
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

#programas
from .models import Programs
from .serializer import ProgramSerializer

# Swagger utils
from drf_yasg.utils import swagger_auto_schema

# My Views.
@swagger_auto_schema(method='GET', operation_description='GET /programas/ -> Obtener todos los Programas.', responses={status.HTTP_200_OK:ProgramSerializer(many=True)})
@swagger_auto_schema(method='POST', operation_description='POST /programas/ -> Registrar Nuevo Programa.', request_body=ProgramSerializer, responses={status.HTTP_201_CREATED:ProgramSerializer, "message":"New Program Created."})
@api_view(['GET', 'POST'])
def programs_apiview(request):
    """APIView para listar toda la data de la API o para registrar/crear un nuevo Programa Académico."""

    # queryset
    try:
        queryset = Programs.objects.get(status=True)

    except Programs.DoesNotExist: # en caso de que no exista la bbdd se envía un código 404
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer_class = ProgramSerializer(queryset, many=True)

        return Response(serializer_class.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        serializer_class = ProgramSerializer(data=request.data)

        # verificación de los datos recibidos:
        if serializer_class.is_valid():
            serializer_class.save() # datos guardados en la bbdd

            return Response(serializer_class.data, status=status.HTTP_201_CREATED)

        else: # caso contrario de encontrarse un error
            return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(method='GET', operation_description='GET /programas/{_id}/ -> Obtener un Programa mediante su ID.', responses={status.HTTP_200_OK:ProgramSerializer})    
@swagger_auto_schema(method='PUT', operation_description='PUT /programas/{_id}/ -> Actualizar un Programa mediante su ID', request_body=ProgramSerializer)
@swagger_auto_schema(method='DELETE', operation_description='DELETE /programas/{_id}/ -> Eliminar un Programa mediante su ID', responses={status.HTTP_204_NO_CONTENT:'Program Has Been Removed Succesfully.'})
@api_view(['GET','PUT','DELETE'])
def programs_apiview_detail(request, _id:int):
    """APIView para listar, actualizar o eliminar todos los datos de un solo Programa Académico."""

    # queryset:
    try:
        program = Programs.objects.get(pk=_id)
    except Programs.DoesNotExist:
        return Response({'message':'Program Not Found.'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer_class = ProgramSerializer(program)

        return Response(serializer_class.data, status=status.HTTP_200_OK)
    
    elif request.method == 'PUT':
        serializer_class = ProgramSerializer(program, data=request.data)

        # verificando datos recibidos:
        if serializer_class.is_valid():
            serializer_class.save()

            return Response(serializer_class.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        program.delete() # elimino el programa recibido por request

        return Response({'message':'Program Has Been Removed Succesfully.'}, status=status.HTTP_204_NO_CONTENT)