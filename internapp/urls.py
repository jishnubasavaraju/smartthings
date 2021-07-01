from rest_framework_mongoengine import routers
from .views import CapsViewSet
from django.urls import path
router = routers.SimpleRouter()
router.register('', CapsViewSet,basename='capb')
urlpatterns = router.urls
urlpatterns += [
    path('internapp/<str:capbid>',CapsViewSet,name='capb_specific')
]
print(router.urls)