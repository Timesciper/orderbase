from rest_framework import viewsets, permissions
from .serializers import OrderSerializer, ItemSerializer
from .models import Item, Order


class OrderViewSet(viewsets.ModelViewSet):

    queryset = Order.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = OrderSerializer


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = ItemSerializer


