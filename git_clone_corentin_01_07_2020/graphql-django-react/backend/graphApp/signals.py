from django.db.models.signals import post_save,post_delete
from graphene_subscriptions.signals import post_save_subscriptions,post_delete_subscriptions

from django.contrib.auth.models import User

post_save.connect(post_save_subscriptions,sender=User,dispatch_uid="User_post_save")
post_delete.connect(post_delete_subscriptions,sender=User,dispatch_uid="User_post_delete")