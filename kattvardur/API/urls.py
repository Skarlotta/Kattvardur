from django.urls import path, include, re_path
from rest_framework import routers
from People.views import PersonViewSet
from Cats.views import CatViewSet
from Breeds.views import EMSViewSet, BreedViewSet, ColorViewSet
from API.auth_views import Login, Logout, OauthLogin, ValidateLogin 
from Catteries.views import CatteryViewSet
from Membership.views import MemberViewSet
from Organizations.views import OrganizationViewSet
from Shows.views import ShowViewSet

app_name = 'API'

router = routers.DefaultRouter()
router.register(r'person', PersonViewSet, basename='person')
router.register(r'member', MemberViewSet, basename="member")
router.register(r'cat', CatViewSet, basename="cat")
router.register(r'cattery', CatteryViewSet, basename="cattery")
router.register(r'organization', OrganizationViewSet, basename="organization")
router.register(r'ems/b', BreedViewSet, basename="breed")
router.register(r'ems/c', ColorViewSet, basename="color")
router.register(r'ems/e', EMSViewSet, basename="ems")
router.register(r'show', ShowViewSet, basename="show")

urlpatterns = [
    path('auth/oauth/', OauthLogin),
    path('auth/login/', Login),
    path('auth/logout/', Logout),
    path('auth/validate/', ValidateLogin),
    path('', include(router.urls)),
] 