from django.urls import path, include, re_path
from rest_framework import routers
from People.views import PersonViewSet
from Cats.views import CatViewSet
from API.auth_views import Login, Logout

app_name = 'API'

router = routers.DefaultRouter()
router.register(r'person', PersonViewSet, basename="person")
router.register(r'cat', CatViewSet, basename="cat")

urlpatterns = [
    path('auth/login/', Login),
    path('auth/logout/', Logout),
    path('', include(router.urls)),
] 