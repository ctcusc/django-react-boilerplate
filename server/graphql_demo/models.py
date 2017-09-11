from django.db import models


class Person(models.Model):
    name = models.CharField(max_length=50)
    picture_url = models.CharField(max_length=200)
    friends = models.ManyToManyField('self', symmetrical=True, blank=True)

    def __str__(self):
        return self.name


class Post(models.Model):
    text = models.CharField(max_length=500)
    owner = models.ForeignKey(Person, on_delete=models.CASCADE)
    time = models.DateTimeField()

    def __str__(self):
        return self.owner.name + ': ' + self.text


class Comment(models.Model):
    text = models.CharField(max_length=500)
    owner = models.ForeignKey(Person, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    time = models.DateTimeField()

    def __str__(self):
        return self.owner.name + ' commented: ' + self.text
