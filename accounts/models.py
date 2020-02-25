from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    USER_TYPE = (('work', 'Работодатель'), ('exe', 'Исполнитель'), ('system', 'Система'))
    balance = models.FloatField(verbose_name='Баланс', default=0)
    user_type = models.CharField(choices=USER_TYPE, default='exe', verbose_name='Тип учетной записи', max_length=20)

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

    def delete(self, using=None, keep_parents=False):
        if self.username == 'System':
            pass
        else:
            super(CustomUser, self).delete(self)
