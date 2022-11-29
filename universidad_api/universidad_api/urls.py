"""universidad_api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# django
from django.contrib import admin
from django.urls import path, include, re_path

# rest framework
from rest_framework import permissions

# Swagger libraries
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# Swagger
schema_view = get_schema_view(
   openapi.Info(
      title="University API",
      default_version='v1',
      description="Documentación de la API para la sección de Universidades de Education Match.",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="some_email@mail.com"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path('admin/', admin.site.urls),

    # Swagger endpoints:
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    # university URLs:
    path('universidad/', include('university.urls')),

    # carreras URLs:
    path('carrera/', include('carreras.urls')),

    # becas URLs:
    path('beca/', include('becas.urls')),

    # programas URLs:
    path('programa/', include('programas.urls'))
]