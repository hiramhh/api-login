# django
from django.db import models

# universidad
from university.models import University

# Create your models here.
class Programs(models.Model):
    """Modelo para la Base de Datos de Programas Universitarios"""

    name = models.CharField(max_length=255, blank=False, null=False, verbose_name='Nombre del Programa')
    description = models.TextField(max_length=1200, verbose_name='Descripción')
    url_program = models.CharField(max_length=255, verbose_name='URL/Link del Programa')
    posted_date = models.DateField(auto_now_add=True, verbose_name='Fecha Publicado')
    expiration_date = models.DateField(auto_now_add=True, verbose_name='Vigencia')
    method = models.TextField(max_length=1200, verbose_name='Metodología')
    objectives = models.TextField(max_length=1200, verbose_name='Objetivos')

    # Modalidades disponibles:
    PRESENCIAL = 'P'
    VIRTUAL = 'V'
    PROGRAM_MODE_CHOICES = [
        (PRESENCIAL, 'Presencial'), 
        (VIRTUAL, 'Virtual')
    ]
    mode = models.CharField(max_length=1, choices=PROGRAM_MODE_CHOICES, default=PRESENCIAL, verbose_name='Modalidad del Programa')
    
    status = models.BooleanField(default=True, verbose_name='Estado')

    # relaciones 
    university = models.ForeignKey(University, on_delete=models.CASCADE)

    class Meta:
        db_table = 'programas'
        verbose_name = 'Programa'
        verbose_name = 'Programas'

    def __str__(self) -> str:
        return self.name