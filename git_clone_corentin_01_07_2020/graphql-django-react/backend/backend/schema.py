from graphApp.schema import Query as base_query
from graphApp.schema import Mutation as mut
import graphene
from graphene_django.views import GraphQLView
from django.contrib.auth.mixins import LoginRequiredMixin

class PrivateView(GraphQLView):
    pass

result = graphene.Schema(query=base_query,mutation=mut)
