"""Admin-site customization for social_network."""

from django.contrib import admin

from .models import Profile, Post, Vote
# We can register models here so that they can be edited in the Django admin site

admin.site.register(Profile)
admin.site.register(Post)
admin.site.register(Vote)
