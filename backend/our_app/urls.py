from django.urls import path
from . import views

urlpatterns = [
    path('homepage-posts/', views.homepage, name='homepage'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('registration/', views.registration, name='registration'),
]
