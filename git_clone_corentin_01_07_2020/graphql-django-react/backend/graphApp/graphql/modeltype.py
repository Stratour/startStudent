from ..models import *
from graphene_django import DjangoObjectType
import graphene

class BaseGroupType(DjangoObjectType):
    class Meta:
        model = Group

class BaseUserType(DjangoObjectType):
    class Meta:
        model = User

class UserType(DjangoObjectType):
    class Meta:
        model = Users

class SchoolType(DjangoObjectType):
    class Meta:
        model = School 

class TaskType(DjangoObjectType):
    class Meta:
        model = Task

class DiaryType(DjangoObjectType):
    class Meta:
        model = Diary

class DiaryTaskType(graphene.ObjectType):
    diary = graphene.Field(DiaryType)
    task = graphene.List(TaskType)

class SurveyType(DjangoObjectType):
    class Meta:
        model = Survey

class StudentType(DjangoObjectType):
    class Meta:
        model = Student

class SiteType(DjangoObjectType):
    class Meta:
        model = sch_site

class EntityType(DjangoObjectType):
    class Meta:
        model = sch_entity