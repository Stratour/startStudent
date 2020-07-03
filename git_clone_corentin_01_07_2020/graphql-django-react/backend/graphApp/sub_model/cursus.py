from django.db import models
from .time import Time
from .school import sch_site

class crs_department(Time):
    crs_dpt_name = models.CharField(max_length=255)
    crs_dpt_description = models.CharField(max_length=255)
    crs_dpt_fk = models.ForeignKey(sch_site,on_delete=models.CASCADE)

class crs_section(Time):
    crs_sct_name = models.CharField(max_length=255)
    crs_sct_subname = models.CharField(max_length=255)
    crs_sct_codification = models.CharField(max_length=255)
    crs_sct_dept_fk = models.OneToOneField(crs_department,on_delete=models.CASCADE)

class crs_degree(Time):
    crs_deg_name = models.CharField(max_length=255)
    crs_deg_fk = models.ForeignKey(crs_section,on_delete=models.CASCADE)

class crs_classes(Time):
    crs_cls_letter = models.CharField(max_length=2)

class crs_school_year(Time):
    crs_sch_year_num = models.SmallIntegerField()

class crs_teaching_unit(Time):
    crs_teachunit_name = models.CharField()
    crs_teachunit_classement = models.CharField(max_length=3)
    crs_teachunit_codification = models.CharField(max_length=255)
    crs_teachunit_domain = models.IntegerFIeld()
    crs_teachunit_critical = models.BooleanField()
    crs_teachunit_periods_number = models.IntegerField()
    crs_teachunit_ects_number = models.IntegerField()

class Cursus(Time):
    crs_dpt_fk = models.ForeignKey(crs_department,on_delete=models.CASCADE)
    crs_sct_fk = models.ForeignKey(crs_section,on_delete=models.CASCADE)
    crs_deg_fk = models.ForeignKey(crs_degree,on_delete=models.CASCADE)
    crs_schyear_fk = models.ForeignKey(crs_school_year,on_delete=models.CASCADE)
    crs_cls_fk = models.ForeignKey(crs_classes,on_delete=models.CASCADE)
    crs_teachunit_fk = models.ForeignKey(crs_teaching_unit,on_delete=models.CASCADE)