# Generated by Django 3.2.18 on 2023-04-19 06:46

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0034_auto_20230419_1014'),
    ]

    operations = [
        migrations.AlterField(
            model_name='campaign',
            name='created',
            field=models.DateTimeField(default=datetime.datetime.now),
        ),
        migrations.AlterField(
            model_name='campaign',
            name='updated',
            field=models.DateTimeField(default=datetime.datetime.now),
        ),
    ]