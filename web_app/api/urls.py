# api/urls.py

from django.conf.urls import url, include
from django.urls import path
from .views import CreateView
from django.conf import settings
from django.contrib.auth.views import auth_logout

urlpatterns = {
    url(r'^user/$', CreateView.as_view(), name="create"),
    path('', include('social_django.urls', namespace='social')),
    path('logout/', auth_logout, {'next_page': settings.LOGOUT_REDIRECT_URL},
         name='logout'),
}

