from django import forms

from .models import Account

from django.contrib.auth.models import User

class UserLoginForm(forms.Form):
    username = forms.CharField(label='Username', max_length=50)
    password = forms.CharField(label='Password', max_length=50)