import graphene
from graphene_django.types import DjangoObjectType
from graphene_subscriptions.events import CREATED

from django.contrib.auth.models import User
from django.models import Model

class Student(User):


class UserType(DjangoObjectType):
    class Meta:
        model = User

class Subscription(graphene.ObjectType):
    user_created = graphene.Field(UserType)

    def resolve_user_created(root,info):
        return root.filter(
            lambda event:
                event.operation == CREATED and isinstance(event.instance,User)
        ).map(lambda event: event.instance)