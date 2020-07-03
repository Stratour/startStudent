from .user import Users
from .time import Time
from django.db import models

class sch_entity(Time):
    sch_ent_name = models.CharField(max_length=255)
    sch_ent_street = models.CharField(max_length=255)
    sch_ent_num_street = models.IntegerField()
    sch_ent_postCode = models.IntegerField()
    sch_ent_city = models.CharField(max_length=255)
    sch_ent_department = models.CharField(max_length=255)
    sch_ent_country = models.CharField(max_length=255)

class sch_site(Time):
    sch_sit_name = models.CharField(max_length=255)
    sch_sit_street = models.CharField(max_length=255)
    sch_sit_num_street = models.IntegerField()
    sch_sit_postCode = models.IntegerField()
    sch_sit_city = models.CharField(max_length=255)
    sch_sit_department = models.CharField(max_length=255)
    sch_sit_country = models.CharField(max_length=255)
    sch_sit_entity_fk = models.ForeignKey(sch_entity,on_delete=models.CASCADE)

class School(Time):
    picture = models.ImageField(default="defaultSchool.jpg")
    sch_director = models.ForeignKey(Users,on_delete=models.CASCADE)
    sch_entity = models.OneToOneField(sch_entity,on_delete=models.CASCADE)
    sch_site = models.ForeignKey(sch_site,on_delete=models.CASCADE)

class Student(Users):
    school_fk = models.ForeignKey(School,on_delete=models.CASCADE)