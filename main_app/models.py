from django.db import models
from accounts.models import CustomUser


class CoreAccount(models.Model):
    system_money = models.FloatField(default=0)


class Item (models.Model):
    name = models.CharField(max_length=30, verbose_name='Название позиции')

    def __str__(self):
        return self.name


class Order (models.Model):
    ORDER_STATUS = (('open', 'Открытый'), ('in_progress', 'Исполняется'), ('finished', 'Выполнен'))
    price = models.FloatField(verbose_name='Цена', default=0)
    creator = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name='Заказчик', related_name='created_orders')
    executor = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name='Исполнитель', related_name='executing_orders', blank=True, null=True)
    status = models.CharField(choices=ORDER_STATUS, default='open', max_length=20)
    items = models.ManyToManyField(Item, blank=True)
    __status_original = None

    class Meta:
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'
