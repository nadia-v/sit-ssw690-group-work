
from django.shortcuts import render, get_object_or_404
from .models import Home

def homepage(request):
    services = Home.objects.all()
    return render(request, 'homes/home.html', {'services': services})

def section(request, service_id):
    service_section = get_object_or_404(Home, pk=service_id)
    return render(request, 'homes/section.html', {'service': service_section})

