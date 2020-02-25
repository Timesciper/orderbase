from rest_framework import routers
from .api import OrderViewSet, ItemViewSet
from accounts.api import UserViewSet


router = routers.DefaultRouter()
router.register('order', OrderViewSet, 'orders')
router.register('item', ItemViewSet, 'items')
router.register('user', UserViewSet, 'users')
urlpatterns = router.urls