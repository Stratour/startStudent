import graphene
from graphene import relay
from graphene_django.debug import DjangoDebug
from .graphql.modeltype import *
from .graphql.mutation import *
from .models import *
from django.shortcuts import get_object_or_404
import graphql_jwt
from django.contrib.auth.models import Group,User
from .graphql.permissions import user_permissions

class Development(graphene.ObjectType):
    admin = graphene.Field(BaseUserType)
    all_director = graphene.List(UserType)
    all_school = graphene.List(SchoolType)
    all_entity = graphene.List(EntityType)

    def resolve_all_entity(self,info,**kwargs):
        if user_permissions(info,super=True):
            return sch_entity.objects.all()
        # If there is no data or if the user is not connected and is not a admin. Return none 
        return sch_entity.objects.none()

    def resolve_all_director(self,info,**kwargs):
        try:
            user = user_permissions(info,super=True)
            director = Users.objects.filter(group_fk=Group.objects.get(name="directors"))
            if director is not None:
                return director
            else:
                raise Exception("No user with these credential corresponds to a admin user")
        except Exception as e:
            raise e

    def resolve_all_school(self,info,**kwargs):
        if user_permissions(info,super=True):
            return School.objects.all()
        return School.objects.none()

    def resolve_admin(self,info,**kwargs):
        try:
            user = user_permissions(info,super=True)
            base_user = get_object_or_404(User,id=user.id)
            if base_user is not None:
                return base_user
            else:
                raise Exception("No user with these credential corresponds to a admin user")
        except Exception as e:
            raise e

class Query(graphene.ObjectType):
    diary = graphene.Field(DiaryTaskType)
    user = graphene.Field(UserType)
    # Activate dev environment
    dev = graphene.Field(Development)

    def resolve_dev(self,info,**kwargs):
        return "Admin user request"

    def resolve_user(self,info,**kwargs):
        user = user_permissions(info)
        if user:
            userType = Users.objects.get(user_fk=User.objects.get(id=user.id))
            return userType

    def resolve_diary(self,info,**kwargs):
        user = info.context.user
        if user.is_authenticated:
            student = get_object_or_404(Student,user=get_object_or_404(User,id=user.id))
            if student is not None:
                diary = get_object_or_404(Diary,student=student)
                task = Task.objects.filter(diary=diary)
                return DiaryTaskType(diary=diary,task=task)
            else:
                raise Exception("Need to be a student")
        else:
            raise Exception("Need to be logged and also to be a student to get diary")

class Mutation(graphene.ObjectType):
    create_director = DirectorMutation.Field()
    create_school = SchoolMutation.Field()
    create_task = TaskMutation.Field()
    create_entity = EntityMutation.Field()
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()