from django.contrib import admin

from .models import Person, Post, Comment

admin.site.register(Person)
admin.site.register(Post)
admin.site.register(Comment)
