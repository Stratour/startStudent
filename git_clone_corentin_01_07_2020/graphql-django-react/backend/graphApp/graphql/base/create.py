from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User as base_user,Group as base_group
from graphApp.models import *

def create_base_user(username,password,email):
    base_user_add = base_user.objects.create_user(username,email,password)
    base_user_add.save()
    return base_user_add

def create_entity(name,street,num_street,post_code,city,department,country):
    entity = sch_entity(sch_ent_name=name,sch_ent_street=street,
    sch_ent_num_street=num_street,sch_ent_postCode=post_code,
    sch_ent_city=city,sch_ent_department=department,
    sch_ent_country=country)

    entity.save()
    return entity

def create_site(name,street,num_street,post_code,city,department,country,entity):
    entity = sch_site(sch_sit_name=name,sch_sit_street=street,
    sch_sit_num_street=num_street,sch_sit_postCode=post_code,
    sch_sit_city=city,sch_sit_department=department,
    sch_sit_country=country,sch_sit_entity_fk=entity)

    entity.save()
    return entity

def create_school(picture,director,entity,site):
    school = School(picture=picture,sch_director=director,
    sch_entity=entity,sch_site=site)

    school.save()

    return school

def check_picture(default,picture):
    return (default if picture is None else picture)

def create_director(username,password,email,picture=None):
    validate_email(email)
    # send_mail("Validation startStudent","test",settings.EMAIL_HOST_USER,[email])
    group = base_group.objects.get(name="directors")
    user = create_base_user(username,password,email)

    user = Users.objects.create(user_fk=user,
        group_fk=group,profile_pic=check_picture("anonymous.png",picture))
    return user