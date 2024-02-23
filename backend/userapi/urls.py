from django.urls import path
from userapi.views import HomeApiView, FileDownloadView, FetchFileDataView

app_name = 'userapi'
urlpatterns = [
    path( "", HomeApiView.as_view() ),
    path( "download/<int:pk>", FileDownloadView.as_view(), name="get_with_pk"),
    path( "fetch_all/", FetchFileDataView.as_view() ), 
]
