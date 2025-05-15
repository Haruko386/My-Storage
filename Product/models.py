from django.db import models


# Create your models here.

class Product(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    price = models.FloatField()
    Buying_Date = models.DateField()
    Classification = models.CharField(max_length=100)
    image = models.ImageField(upload_to='products/')
    description = models.TextField()

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['Buying_Date']
        verbose_name_plural = 'Products'
        verbose_name = 'Product'

