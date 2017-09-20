"""URLs specific to the social_network app."""

from django.conf.urls import include, url

from . import views

urlpatterns = [
    url(r'^posts/?$', views.post_list),
    url(r'^posts/(?P<pk>[0-9]+)/$', views.post_detail),
]
