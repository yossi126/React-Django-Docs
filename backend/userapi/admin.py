from django.contrib import admin
from .models import FileModel


# Register your models here.

class FileModelAdmin(admin.ModelAdmin):
    # the order of display on the admin pannel
    list_display = ('file_name', 'id', 'ver', 'time_stamp')


    # django magic, automatically adds these search fields and filter 
    # to admin view
    search_fields = ('file_name',) 
    list_filter = ('ver',)

admin.site.register(FileModel, FileModelAdmin)