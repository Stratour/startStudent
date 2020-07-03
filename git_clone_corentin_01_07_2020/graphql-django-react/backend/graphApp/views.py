from django.shortcuts import render
from django.http import JsonResponse
from django import forms
from django.utils import timezone
import os
from django.core.files.storage import FileSystemStorage
from django.contrib import messages
# Create your views here.

class FileUploadForm(forms.Form):
    file = forms.FileField()

# def file_upload(request):
#     if request.method == 'POST':
#         form = FileUploadForm(request.POST,request.FILES)
#         if form.is_valid():
#             for i in request.FILES:
#                 file = request.FILES[i]
#                 fs = FileSystemStorage()
#                 save = fs.save(file.name, file)
#                 url = fs.url(save)
#                 return JsonResponse({'state':True,'filename':file.name,'url':url})
#         else:
#             return JsonResponse({'state':False,'message':messages.error(request,'Error')})
#     return JsonResponse({'state':False,'message':"Route only accept post method"})

def file_upload(request):
    if request.method == 'POST':
        form = FileUploadForm(request.POST,request.FILES)
        for i in request.FILES:
            file = request.FILES[i]
            fs = FileSystemStorage()
            save = fs.save(file.name, file)
            url = fs.url(save)
            return JsonResponse({'state':True,'filename':file.name,'url':url,'name':i})
    return JsonResponse({'state':False,'message':"Route only accept post method"})