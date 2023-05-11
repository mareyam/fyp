# Generated by Django 3.2.18 on 2023-05-11 04:48

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0080_alter_campaign_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='campaign',
            name='budget',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AlterField(
            model_name='campaign',
            name='campaign_name',
            field=models.CharField(blank=True, default='', max_length=50, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='campaign',
            name='campaign_type',
            field=models.CharField(blank=True, choices=[('Periodic', 'Periodic'), ('Single', 'Single'), ('Both', 'Both')], default='Periodic', max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='campaign',
            name='content_type',
            field=models.ManyToManyField(blank=True, default='Post', null=True, to='base.ContentType'),
        ),
        migrations.AlterField(
            model_name='campaign',
            name='created',
            field=models.DateField(blank=True, default=django.utils.timezone.now, null=True),
        ),
        migrations.AlterField(
            model_name='campaign',
            name='ended',
            field=models.DateField(blank=True, default=django.utils.timezone.now, null=True),
        ),
        migrations.AlterField(
            model_name='campaign',
            name='hashtag',
            field=models.CharField(blank=True, default='', max_length=50, null=True),
        ),
    ]
