# Generated by Django 3.2.18 on 2023-05-04 09:03

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0064_auto_20230504_1229'),
    ]

    operations = [
        migrations.AddField(
            model_name='newcampaign',
            name='ended',
            field=models.DateField(default=django.utils.timezone.now, null=True),
        ),
        migrations.AlterField(
            model_name='newcampaign',
            name='created',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]