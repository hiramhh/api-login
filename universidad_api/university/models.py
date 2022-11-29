#django
from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class University(models.Model):
    """Modelo para la Base de Datos de Universidades"""

    name = models.CharField(max_length=255, unique=True, verbose_name='Nombre de la Universidad')
    ubication = models.CharField(max_length=255, verbose_name='Ubicación')
    description = models.TextField(max_length=1200, verbose_name='Descripción')
    oficial_page = models.CharField(max_length=255, verbose_name='Link de la Página Oficial')
    
    #Relaciones:
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        db_table = 'universidades'
        verbose_name = 'Universidad'
        verbose_name_plural = 'Universidades'

    def __str__(self) -> str:
        return self.name