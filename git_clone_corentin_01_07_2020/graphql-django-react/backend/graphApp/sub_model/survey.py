from .user import Users,Time
from django.db import models

class Survey(Time):
    users_fk = models.OneToOneField(Users,on_delete=models.CASCADE)
    title = models.CharField(max_length=255)

class Choice(Time):
    title = models.CharField(max_length=255)
    checked = models.BooleanField(default=False)
    survey_fk = models.ForeignKey(Survey,on_delete=models.CASCADE,default=None)