# Generated by Django 3.2.18 on 2023-05-19 00:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0105_alter_adminlogin_created'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='adminlogin',
            name='created',
        ),
    ]
