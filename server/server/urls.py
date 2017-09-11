"""server URL Configuration.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))

"""

from django.conf.urls import include, url
from django.contrib import admin


from social_network import views as social_views

urlpatterns = [
    url(r'^social/$', social_views.api_root),
    url(r'^social/profiles/$', social_views.ProfileList.as_view(), name='profile-list'),
    url(r'^social/profiles/(?P<pk>[0-9]+)/$', social_views.ProfileDetail.as_view(),
        name='profile-detail'),
    url(r'^social/posts/$', social_views.PostList.as_view(), name='post-list'),
    url(r'^social/posts/(?P<pk>[0-9]+)/$', social_views.PostDetail.as_view(),
        name='post-detail'),

    url(r'^dev-api/', include('rest_framework.urls')),
    url(r'^admin/', admin.site.urls),
]
