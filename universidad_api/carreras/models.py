# django
from django.db import models

# university
from university.models import University

# Create your models here.
class CollegeCareer(models.Model):
    """Modelo para la Base de Datos de Carreras Universitarias"""

    name = models.CharField(max_length=255, verbose_name='Nombre de la Carrera')
    description = models.TextField(max_length=1200, verbose_name='Descripción')
    posted_date = models.DateField(auto_now_add=True, verbose_name='Fecha Publicado')
    oficial_page = models.CharField(max_length=255, verbose_name='Link de la Página Oficial de la Carrera')
    pensum_link = models.CharField(max_length=255, verbose_name='Link del Plan de Estudios/Pensum')
    status = models.BooleanField(default=True, verbose_name='Estado')

    #relaciones
    university = models.ForeignKey(University, on_delete=models.CASCADE)

    class Meta:
        db_table = 'carreras_universitarias'
        verbose_name = 'Carrera'
        verbose_name_plural = 'Carreras'
    
    def __str__(self) -> str:
        return self.name