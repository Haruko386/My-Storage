from django.contrib.auth.models import User
from django.db import models


# Create your models here.

class Product(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    Shooting_Date = models.DateField()
    image = models.ImageField(upload_to='products/')
    description = models.TextField()
    visible = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-id']
        verbose_name_plural = 'Products'
        verbose_name = 'Product'

