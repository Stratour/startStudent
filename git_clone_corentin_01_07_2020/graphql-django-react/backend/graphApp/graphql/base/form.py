from graphApp.models import *
from django import forms

class SchoolForm(forms.ModelForm):
    class Meta:
        model = School
        fields = '__all__'

class EntityForm(forms.ModelForm):
    class Meta:
        model = sch_entity
        fields = '__all__'

class SiteForm(forms.ModelForm):
    class Meta:
        model = sch_site
        fields = '__all__'