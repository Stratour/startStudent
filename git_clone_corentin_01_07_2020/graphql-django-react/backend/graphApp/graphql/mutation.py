import graphene
from .modeltype import *
from django.shortcuts import get_object_or_404
from django.core.mail import send_mail
from django.conf import settings
from .permissions import user_permissions
from .base.create import *
from graphene_django.forms.mutation import DjangoModelFormMutation
from .base.form import *

class SchoolInput(graphene.InputObjectType):
    picture = graphene.String()
    name = graphene.String(required=True)
    street = graphene.String(required=True)
    num_street = graphene.Int(required=True)
    post_code = graphene.Int()
    city = graphene.String()
    department = graphene.String()
    country = graphene.String(required=True)
    director_fk = graphene.Int(required=True)

class EntityInput(graphene.InputObjectType):
    picture = graphene.String()
    name = graphene.String(required=True)
    street = graphene.String(required=True)
    num_street = graphene.Int(required=True)
    post_code = graphene.Int()
    city = graphene.String()
    department = graphene.String()
    country = graphene.String(required=True)

class DirectorMutation(graphene.Mutation):
    Output = UserType

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)
        files = graphene.String()

    def mutate(self,info,username,password,email,files):
        if user_permissions(info,super=True):
            return create_director(username,password,email,files)

class SchoolMutation(graphene.Mutation):
    Output = SchoolType

    class Arguments:
        data = SchoolInput()
    
    def mutate(self,info,data):
        if user_permissions(info,super=True):
            director = get_object_or_404(Users,
                user_fk=get_object_or_404(User,id=data.director_fk))

            if director is None:
                raise Exception('No director finded')

            entity = create_entity(data.name,data.street,
            data.num_street,data.post_code,data.city,
            data.department,data.country)
            
            site = create_site(data.name,data.street,
            data.num_street,data.post_code,data.city,
            data.department,data.country,entity)
            
            return create_school(data.picture,director,entity,site)

class TaskMutation(graphene.Mutation):
    Output = TaskType

    class Arguments:
        title = graphene.String()
        description = graphene.String()
        to = graphene.String()

    def mutate(self,info,title,description,to):
        pass

class EntityMutation(graphene.Mutation):
    Output = EntityType

    class Arguments:
        data = EntityInput()

    def mutate(self,info,data):
        if user_permissions(info,super=True):
            return create_entity(data.name,data.street,
            data.num_street,data.post_code,data.city,
            data.department,data.country)