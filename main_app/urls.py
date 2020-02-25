from rest_framework import routers
from .api import OrderViewSet, ItemViewSet
from accounts.api import UserViewSet, SystemViewSet


router = routers.DefaultRouter()
router.register('order', OrderViewSet, 'orders')
router.register('item', ItemViewSet, 'items')
router.register('user', UserViewSet, 'users')
router.register('system', SystemViewSet, 'system')
urlpatterns = router.urls
