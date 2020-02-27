from django.shortcuts import render
from .models import Order
from accounts.models import CustomUser
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
import ast


def get_or_create_system_user():
    try:
        CustomUser.objects.get(username=settings.SYSTEM_USER_USERNAME)
    except CustomUser.DoesNotExist:
        # have to create this user
        CustomUser.objects.create_superuser(username=settings.SYSTEM_USER_USERNAME, email=settings.SYSTEM_USER_EMAIL,
                                            password=settings.SYSTEM_USER_PASSWORD, balance=0.0, user_type='system')
    return CustomUser.objects.get(username=settings.SYSTEM_USER_USERNAME).id


def update_order_status(order_id):
    try:
        target_order = Order.objects.get(pk=order_id)
    except Order.DoesNotExist:
        target_order = False
    if target_order:
        target_order.status = 'finished'
        target_order.save()
    return target_order


def give_money(user_id, money):
    try:
        user = CustomUser.objects.get(pk=user_id)
    except CustomUser.DoesNotExist:
        return False
    user.balance += money
    user.save()
    return True



@csrf_exempt
def check_request(request):
    return JsonResponse({
        'data': True
    })


@method_decorator(csrf_exempt, name='dispatch')
class FinalOrder(View):
    def post(self, request, *args, **kwargs):
        # получаем реквест в виде байт эррея, затем берем в дикт, парсим и выполняем пост (request.body)
        """
        data = {
            id: Order.id
            owner: CustomUser.id
            executor: CustomUser.id
            price: Order.price
        }
        """
        data_dict = ast.literal_eval(request.body.decode('utf-8'))
        print(data_dict)
        try:
            order_id = data_dict['id']
            executor_id = data_dict['executor']
            creator_id = data_dict['creator']
        except KeyError:
            return JsonResponse({
                'error': 'Bad Request'
            }, status=403)
        order = update_order_status(order_id)
        money = order.price*0.85
        give_money(executor_id, money)
        give_money(creator_id, order.price)
        system = get_or_create_system_user()
        system = give_money(system, order.price-money)
        if system:
            return JsonResponse({
                'status': 'Success'
            })


