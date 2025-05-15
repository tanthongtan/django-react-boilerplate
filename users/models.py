from django.db import models
from django.contrib.auth.models import AbstractUser

from .managers import CustomUserManager

class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [] #override since abstractuser puts email in required_fields and clashes

    objects = CustomUserManager()