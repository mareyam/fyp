# Generated by Django 3.2.18 on 2023-05-17 08:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0096_prlogin_confirm_password'),
    ]

    operations = [
        migrations.AlterField(
            model_name='prlogin',
            name='confirm_password',
            field=models.CharField(blank=True, max_length=128, null=True),
        ),
    ]
