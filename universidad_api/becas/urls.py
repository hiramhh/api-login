# django
from django.contrib import admin
from django.urls import path

# becas
from becas import views

urlpatterns = [
    path('becas/', views.scholarship_apiview),    
    path('becas/<int:_id>', views.scholarship_apiview_detail)
]