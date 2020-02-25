from rest_framework import routers
from .api import OrderViewSet, ItemViewSet


router = routers.DefaultRouter()
router.register('order', OrderViewSet, 'orders')
router.register('item', ItemViewSet, 'items')
urlpatterns = router.urls