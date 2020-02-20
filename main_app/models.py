from django.db import models
from accounts.models import CustomUser


class Item (models.Model):
    name = models.CharField(max_length=30, verbose_name='Название позиции')


class Order (models.Model):
    ORDER_STATUS = (('open', 'Открытый'), ('in_progress', 'Исполняется'), ('finished', 'Выполнен'))
    price = models.FloatField(verbose_name='Цена', default=0)
    creator = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name='Заказчик', related_name='created_orders')
    executor = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name='Исполнитель', related_name='executing_orders')
    status = models.CharField(choices=ORDER_STATUS, default='open', max_length=20)
    items = models.ManyToManyField(Item)

    class Meta:
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'

