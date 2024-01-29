from django.db import models

# Create your models here.

class File(models.Model):

    file_name = models.CharField(max_length=50)
    file_binary = models.BinaryField(max_length=2048)
