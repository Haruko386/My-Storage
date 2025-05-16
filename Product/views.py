from django.http import HttpResponse
from django.shortcuts import render, redirect

from Product.models import Product
import markdown
from .form import ProductForm
from django.contrib.auth.models import User
from django.contrib import messages


# Create your views here.

def product_list(request):
    products = Product.objects.all()
    context = {'products': products}

    return render(request, 'product/list.html', context)


def product_detail(request, id):
    product = Product.objects.get(id=id)
    product.description = markdown.markdown(product.description,
                                            extensions=[
                                                # 包含 缩写、表格等常用扩展
                                                'markdown.extensions.extra',
                                                # 语法高亮扩展
                                                'markdown.extensions.codehilite',
                                            ])
    context = {'product': product}

    return render(request, "product/detail.html", context)


from django.contrib import messages


def product_add(request):
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            product = form.save()
            messages.success(request, f'产品 "{product.name}" 添加成功')
            return redirect('products-list')  # 改为重定向到列表页
        else:
            messages.error(request, '表单填写有误，请检查后重新提交')
    else:
        form = ProductForm()

    return render(request, 'product/add.html', {'form': form})


def product_delete(request, id):
    product = Product.objects.get(id=id)
    product.delete()
    return redirect('product_list')


def product_edit(request, id):
    product = Product.objects.get(id=id)
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES, instance=product)
        if form.is_valid():
            form.save()
            return redirect('product_list')
    else:
        return HttpResponse('Form is not valid')

