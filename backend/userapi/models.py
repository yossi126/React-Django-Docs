from django.db import models

# Create your models here.

class FileModel(models.Model):

    id = models.AutoField(auto_created=True, primary_key=True)
    file_name = models.CharField(max_length=100)
    file = models.FileField(upload_to="files")
    ver = models.CharField(max_length=5)
    time_stamp = models.DateTimeField(auto_now=True)
    

    
    def __str__(self):
        return self.file_name
