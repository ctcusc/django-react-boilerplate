"""URLs specific to the social_network app."""

from django.conf.urls import include, url
from rest_framework.routers import DefaultRouter
from rest_framework.schemas import get_schema_view

from . import views

router = DefaultRouter(trailing_slash=False)
router.register(r'profiles', views.ProfileViewSet)
router.register(r'posts', views.PostViewSet)

# This generates a coreapi schema that can be used by coreapi clients
schema_view = get_schema_view(title='social_network API')

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^schema/$', schema_view),
]
