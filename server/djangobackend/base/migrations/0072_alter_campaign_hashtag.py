# Generated by Django 3.2.18 on 2023-05-06 10:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0071_alter_campaign_hashtag'),
    ]

    operations = [
        migrations.AlterField(
            model_name='campaign',
            name='hashtag',
            field=models.CharField(default='DEFAULT', max_length=50),
        ),
    ]