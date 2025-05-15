from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.views import View
from pyexpat.errors import messages

from Account.form import UserLoginForm


# Create your views here.


def user_register(request):
    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        password2 = request.POST['<PASSWORD>']
        if password == password2:
            if User.objects.filter(username=username).exists():
                messages.error(request, 'Username already taken')
    elif request.method == 'GET':
            return render(request, '/account/register')


def user_login(request):
    if request.method == 'POST':
        user_login_form = UserLoginForm(request.POST)
        if user_login_form.is_valid():
            # .cleaned_data 清洗出合法数据
            data = user_login_form.cleaned_data
            # 检验账号、密码是否正确匹配数据库中的某个用户
            # 如果均匹配则返回这个 user 对象
            user = authenticate(username=data['username'], password=data['password'])
            if user:
                login(request, user)
                return redirect(request,'index')
            else:
                return redirect(request, 'account/login.html')
        else:
            return redirect('account/login')
    elif request.method == 'GET':
        user_login_form = UserLoginForm()
        context = {'form': user_login_form}
        return render(request, 'account/login.html', context)
    else:
        return HttpResponse('Please enter correct username and password')

def user_logout(request):
    logout(request)
    return redirect('index')
