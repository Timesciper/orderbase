from django.shortcuts import render


def index(request, slug=''):
    path = 'frontend/index.html'
    return render(request, path)
