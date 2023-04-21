# Generated by Django 3.2.18 on 2023-04-19 05:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0033_alter_campaign_hashtag_campaign'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='brandreport',
            name='active_influencers',
        ),
        migrations.RemoveField(
            model_name='brandreport',
            name='campaign_count',
        ),
        migrations.DeleteModel(
            name='Campaigns',
        ),
        migrations.DeleteModel(
            name='Drinks',
        ),
        migrations.RemoveField(
            model_name='filter',
            name='brand',
        ),
        migrations.RemoveField(
            model_name='filter',
            name='hashtag',
        ),
        migrations.DeleteModel(
            name='InfluencerCost',
        ),
        migrations.RemoveField(
            model_name='message',
            name='room',
        ),
        migrations.RemoveField(
            model_name='message',
            name='user',
        ),
        migrations.RemoveField(
            model_name='room',
            name='host',
        ),
        migrations.RemoveField(
            model_name='room',
            name='topic',
        ),
        migrations.RemoveField(
            model_name='samplemodel',
            name='user',
        ),
        migrations.RemoveField(
            model_name='brandmanager',
            name='password',
        ),
        migrations.RemoveField(
            model_name='campaign',
            name='cost_per_influencer',
        ),
        migrations.RemoveField(
            model_name='campaign',
            name='description',
        ),
        migrations.RemoveField(
            model_name='subbrand',
            name='brandmanager_name',
        ),
        migrations.AddField(
            model_name='brand',
            name='subbrand_name',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='base.subbrand', unique=True),
        ),
        migrations.DeleteModel(
            name='BrandReport',
        ),
        migrations.DeleteModel(
            name='Filter',
        ),
        migrations.DeleteModel(
            name='Message',
        ),
        migrations.DeleteModel(
            name='Room',
        ),
        migrations.DeleteModel(
            name='SampleModel',
        ),
        migrations.DeleteModel(
            name='Topic',
        ),
    ]