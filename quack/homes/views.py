
from django.shortcuts import render, get_object_or_404
from .models import Home

def homepage(request):
    services = Home.objects.all()
    return render(request, 'homes/home.html', {'services': services})

