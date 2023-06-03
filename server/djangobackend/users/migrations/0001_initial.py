# Generated by Django 3.2.18 on 2023-05-29 05:29

from django.db import migrations, models
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0014_auto_20230516_1128'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserAccount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('uid', models.UUIDField(default=uuid.uuid4, editable=False, unique=True, verbose_name='Public Identifier')),
                ('username', models.CharField(blank=True, max_length=30, null=True)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('name', models.CharField(blank=True, max_length=30, null=True)),
                ('role', models.CharField(blank=True, choices=[('Admin', 'Admin'), ('PRAgency', 'PRAgency'), ('BrandManager', 'BrandManager')], max_length=30, null=True)),
                ('date_joined', models.DateField(blank=True, default=django.utils.timezone.now, null=True)),
                ('is_active', models.BooleanField(blank=True, default=True, null=True)),
                ('is_staff', models.BooleanField(blank=True, default=True, null=True)),
                ('is_superuser', models.BooleanField(blank=True, default=True, null=True)),
                ('is_deleted', models.BooleanField(blank=True, default=False, null=True)),
                ('created_date', models.DateField(blank=True, default=django.utils.timezone.now, null=True)),
                ('modified_date', models.DateField(blank=True, default=django.utils.timezone.now, null=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
            },
        ),
    ]
