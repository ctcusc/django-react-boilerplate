import graphene
from graphene import resolve_only_args

from .models import (
    Person as PersonModel, Post as PostModel, Comment as CommentModel
)


class Person(graphene.ObjectType):
    id = graphene.ID()
    name = graphene.String()
    picture_url = graphene.String()
    friends = graphene.List(lambda: Person)
    posts = graphene.List(lambda: Post)

    def resolve_friends(self, args, *_):
        return PersonModel.objects.filter(friends__id=self.id)

    def resolve_posts(self, args, *_):
        return PostModel.objects.filter(owner__id=self.id)


class TextContent(graphene.Interface):
    id = graphene.ID()
    time = graphene.types.datetime.DateTime()
    text = graphene.String()
    owner = graphene.Field(Person)


class Post(graphene.ObjectType):
    class Meta:
        interfaces = (TextContent,)
    comments = graphene.List(lambda: Comment)

    def resolve_comments(self, args, *_):
        return CommentModel.objects.filter(post__id=self.id)


class Comment(graphene.ObjectType):
    class Meta:
        interfaces = (TextContent,)


class Query(graphene.ObjectType):

    persons = graphene.List(Person)
    person = graphene.Field(Person, id=graphene.ID())

    @resolve_only_args
    def resolve_persons(self):
        return PersonModel.objects.all()

    @resolve_only_args
    def resolve_person(self, id):
        return PersonModel.objects.get(pk=id)


class CreatePerson(graphene.Mutation):
    name = graphene.String()
    picture_url = graphene.String()
    friends = graphene.List(lambda: Person)

    @staticmethod
    def mutate(root, args, context, info):
        pass


class Mutations(graphene.ObjectType):
    create_person = CreatePerson.Field()


schema = graphene.Schema(query=Query, mutation=Mutations)
