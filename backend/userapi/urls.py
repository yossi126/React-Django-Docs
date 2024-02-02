from django.urls import path
from userapi.views import HomeApiView

urlpatterns = [
    path("", HomeApiView.as_view() ),
]
