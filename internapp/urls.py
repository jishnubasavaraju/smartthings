from rest_framework_mongoengine import routers
from .views import CapsViewSet

router = routers.SimpleRouter()
router.register('', CapsViewSet)
urlpatterns = router.urls