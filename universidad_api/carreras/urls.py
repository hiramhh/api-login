# django
from django.contrib import admin
from django.urls import path

# carreras
from carreras import views

urlpatterns = [
    path('carreras/', views.career_apiview),    
    path('carreras/<int:_id>', views.career_apiview_detail)
]