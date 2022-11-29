# programas
from programas import views

# django 
from django.urls import path, include

urlpatterns = [
    path('programas/', views.programs_apiview),    
    path('programas/<int:_id>', views.programs_apiview_detail)
]