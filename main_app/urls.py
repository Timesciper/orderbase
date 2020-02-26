from rest_framework import routers
from django.urls import path
from .api import OrderViewSet, ItemViewSet
from accounts.api import UserViewSet
from .views import check_request, FinalOrder

router = routers.DefaultRouter()
router.register('order', OrderViewSet, 'orders')
router.register('item', ItemViewSet, 'items')
router.register('user', UserViewSet, 'users')
urlpatterns = router.urls

urlpatterns += [
    path('check_request', check_request),
    path('final_order', FinalOrder.as_view())
]
