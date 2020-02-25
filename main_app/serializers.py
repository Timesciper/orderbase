from rest_framework import serializers
from .models import Order, Item

class OrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = "__all__"


class ItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Item
        fields = "__all__"