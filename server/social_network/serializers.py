"""Serializers are our way to interact with Django REST framework.

They allow us to write code that runs to convert our custom models to/from JSON
For more information, see http://www.django-rest-framework.org/tutorial/1-serialization/
"""

from rest_framework import serializers

from .models import Post


class PostSerializer(serializers.Serializer):
    """Serialize a Post to/from the database."""

    title = serializers.CharField(max_length=200)
    created = serializers.DateTimeField()

    def create(self, validated_data):
        """Create and return a new `Post` instance, given the validated data."""
        return Post.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """Update and return an existing `Post` instance, given the validated data."""
        instance.title = validated_data.get('title', instance.title)
        instance.created = validated_data.get('created', instance.style)
        instance.save()
        return instance
