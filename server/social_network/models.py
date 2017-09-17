"""Models for the social_network."""

from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    """Profile is a Model that stores application-specific data about a user.

    This is not used directly for authentication/authorization, instead the
    Django default User model is used for these purposes.
    """

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    username = models.CharField(max_length=200)
    picture_url = models.URLField()

    def __str__(self):
        """Return a human-readable description of this Profile."""
        return 'Profile: {}'.format(self.username)


class Post(models.Model):
    """Post is an individual post on the social media site.

    A Post is simply a text message associated with a user Profile.
    """

    # A Post has an owner Profile reference, this is a Many-to-One relationship, all Posts have
    # exactly one Profile, and a Profile has 0 or more Posts, the `related_name` argument means that
    # all of a Profile instance's Posts can be accessed as `profile.posts`
    owner = models.ForeignKey(Profile, related_name='posts', on_delete=models.CASCADE)

    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=200)

    def __str__(self):
        """Return a human-readable description of this Post."""
        return 'Post: "{}" by {}'.format(self.title, self.owner.username)


class Vote(models.Model):
    """Vote maps a Profile upvoting a Post."""

    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

    def __str__(self):
        """Return a human-readable description of this Vote."""
        return 'Vote: {} for "{}"'.format(self.profile.username, self.post.title)
