from django.urls import path, include, re_path
from rest_framework import routers
from People.views import PersonViewSet
from Cats.views import CatViewSet
from Breeds.views import EMSViewSet, BreedViewSet, ColorViewSet
from API.auth_views import Login, Logout, OauthLogin
from Catteries.views import CatteryViewSet
from Membership.views import MemberViewSet
from Organizations.views import OrganizationViewSet

app_name = 'API'

router = routers.DefaultRouter()
router.register(r'person', PersonViewSet, basename="person")
router.register(r'member', MemberViewSet, basename="member")
router.register(r'cat', CatViewSet, basename="cat")
router.register(r'cattery', CatteryViewSet, basename="cattery")
router.register(r'organization', OrganizationViewSet, basename="organization")
router.register(r'ems/b', BreedViewSet, basename="breed")
router.register(r'ems/c', ColorViewSet, basename="color")
router.register(r'ems/e', EMSViewSet, basename="ems")

urlpatterns = [
    path('auth/oauth/', OauthLogin),
    path('auth/login/', Login),
    path('auth/logout/', Logout),
    path('', include(router.urls)),
] 