from django.db import models
from .school import Student,Time

class Diary(Time):
    title = models.CharField(max_length=255)
    student_fk = models.OneToOneField(Student,on_delete=models.CASCADE)

class Task(Time):
    title = models.CharField(max_length=255)
    description = models.TextField()
    start = models.DateTimeField(null=True, blank=True)
    end = models.DateTimeField(null=True, blank=True)
    diary_fk = models.ForeignKey(Diary,on_delete=models.CASCADE)