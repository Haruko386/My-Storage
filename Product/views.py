from django.http import HttpResponse
from django.shortcuts import render

from Product.models import Product
import markdown


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
