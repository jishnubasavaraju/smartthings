from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('create',index),
    path('capbs',index),
    path('detail/<str:capbid>',index),
]
