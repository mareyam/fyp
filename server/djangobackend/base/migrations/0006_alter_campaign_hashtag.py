# Generated by Django 4.1.7 on 2023-03-30 00:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0005_campaign_brand_hashtag_alter_campaign_hashtag'),
    ]

    operations = [
        migrations.AlterField(
            model_name='campaign',
            name='hashtag',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='base.hashtag'),
        ),
    ]