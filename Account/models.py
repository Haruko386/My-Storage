from django.db import models


# Create your models here.

class Account(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    email = models.CharField(max_length=50)

    registered_date = models.DateField(auto_now_add=True)
    last_login = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.username

    class Meta:
        db_table = 'Account'
        verbose_name = 'Account'
        verbose_name_plural = 'Accounts'
        unique_together = (('username', 'email'),)
        get_latest_by = 'last_login'
        ordering = ['id']