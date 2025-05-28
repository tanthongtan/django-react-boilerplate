from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from django.views.generic.base import TemplateView

# Create your views here.
# make sure this view is only accessible on login
@method_decorator(login_required, name='dispatch')
class IndexView(TemplateView):
    # our hybrid template
    template_name = 'core/index.html'