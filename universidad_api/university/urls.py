# django
from django.urls import path

# university
from university import views

urlpatterns = [
    path('', views.university_apiview),    
    path('<int:_id>/', views.university_apiview_detail)
]