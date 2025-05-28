from django.urls import path
from .views import IndexView

app_name = 'core'

# The URLs are now determined automatically by the router.
urlpatterns = [
    path('index/', IndexView.as_view(), name="index"),
]