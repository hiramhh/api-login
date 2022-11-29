# django
from django.db import models

# university
from university.models import University

# Create your models here.
class Scholarship(models.Model):
    """Modelo para la Base de Datos de Carreras Universitarias"""

    name = models.CharField(max_length=255, verbose_name='Nombre de la Beca')
    description = models.TextField(max_length=1200, verbose_name='Descripción')
    requirements = models.TextField(max_length=800, verbose_name='Requisitos')
    vacancy_numbers = models.IntegerField(default=0, blank=False, null=False, verbose_name='Plazas/Vacantes')
    official_page = models.CharField(max_length=255, verbose_name='URL de la Página de la Beca')
    posted_date = models.DateField(auto_now_add=True, verbose_name='Fecha de Publicación')
    expiration_date = models.DateField(auto_now_add=True, verbose_name='Vigencia')
    status = models.BooleanField(default=True, verbose_name='Estado')

    # relaciones 
    university = models.ForeignKey(University, on_delete=models.CASCADE)

    class Meta:
        db_table = 'becas'
        verbose_name = 'Beca'
        verbose_name_plural = 'Becas'

    def __str__(self) -> str:
        return self.name
