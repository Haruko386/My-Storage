from django.urls import path
from . import views
urlpatterns = [
    path('login/', views.user_login, name='login'),
    path('logout/', views.user_logout, name='logout'),
    path('profile', views.user_profile, name='user_profile'),
]