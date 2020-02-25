from rest_framework import viewsets, permissions
from .serializers import OrderSerializer, ItemSerializer
from .models import Item, Order


class OrderViewSet(viewsets.ModelViewSet):

    queryset = Order.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]

    """
    def get_queryset(self):
        if self.request.user:
            return Order.objects.all()
    """

    serializer_class = OrderSerializer


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ItemSerializer