from django.shortcuts import render, get_object_or_404
from django.views.generic import TemplateView
from django.views import View
from django.http import FileResponse, JsonResponse
from django.core.serializers import serialize
from django.views.decorators.csrf import csrf_exempt
from django.urls import reverse
from .models import FileModel
import json

# Create your views here.

class HomeApiView(TemplateView):
    template_name = "home.html"


class FileDownloadView(View):
    def get(self, request, pk):
        file_model = get_object_or_404(FileModel, pk=pk)
        file_path = file_model.file.path
        response = FileResponse(open(file_path, 'rb'))
        response['Content-Disposition'] = f'attachment; filename="{file_model.file.name}"'
        return response
    

class FetchFileDataView(View):
    def get(self, request, *args, **kwargs):
        try:    
            all_files_tables = FileModel.objects.all()

            serialized_file_tables = [ {'file_name': table.file_name,
                                        'ver': table.ver,
                                        'file': 
                                            f'{
                                                reverse('userapi:get_with_pk',
                                                         kwargs={'pk': table.pk})
                                                }'} for table in all_files_tables]

            return JsonResponse({'tables': serialized_file_tables})
        
        except Exception as e:
            return JsonResponse({'error': 'Internal Server Error'}, status=500)