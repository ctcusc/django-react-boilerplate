"""Serializers are our way to interact with Django REST framework.

They allow us to write code that runs to convert our custom models to/from JSON
For more information, see http://www.django-rest-framework.org/tutorial/1-serialization/
"""

from rest_framework import serializers

from .models import Post, Profile


class PostSerializer(serializers.HyperlinkedModelSerializer):
    """Serializes Posts.

    This is an example of a semi-customized Serializer class, for simple Models, the ModelSerializer
    is capable of doing just about everything we want, but in this case we want to have a "computed"
    field that counts how many votes a post has received.
    """

    class Meta:
        """Model/fields for ModelSerializer."""

        model = Post
        fields = ['id', 'url', 'owner', 'owner_name', 'title', 'vote_count']

    vote_count = serializers.SerializerMethodField()
    owner = serializers.HyperlinkedRelatedField(view_name='profile-detail', read_only=True)
    owner_name = serializers.ReadOnlyField(source='owner.username')

    def get_vote_count(self, post):
        """Count how many votes the `Post` has received."""
        return post.vote_set.count()


class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    """Serializes user Profiles."""

    class Meta:
        """Model/fields for ModelSerializer."""

        model = Profile
        fields = ['id', 'url', 'username', 'posts']

    # this is a Django backwards relation mapping Profile -> Posts, so it won't be included by
    # default by the ModelSerializer, so we have to add it manually
    # Use the PostSerializer so that the Post objects will be fully instantiated
    posts = PostSerializer(many=True, read_only=True)
