from django.urls import path
from . import views
urlpatterns = [
    path("products-list/", views.product_list, name="products-list"),
    path('products-detail/<int:id>/', views.product_detail, name='products_detail'),
    path('products-add/', views.product_add, name='product_add'),
    path('product-delete/<int:id>/', views.product_delete, name='product_delete')
]
