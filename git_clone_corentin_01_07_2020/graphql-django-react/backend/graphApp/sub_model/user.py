from django.contrib.auth.models import User,Group
from .time import Time
from django.db import models

class Users(Time):
    profile_pic = models.ImageField(default="anonymous.png")
    user_fk = models.OneToOneField(User,on_delete=models.CASCADE)
    group_fk = models.ForeignKey(Group,on_delete=models.CASCADE)
    validated = models.BooleanField(default=False)