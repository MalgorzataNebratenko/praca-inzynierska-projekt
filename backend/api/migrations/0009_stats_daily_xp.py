# Generated by Django 4.2.6 on 2024-01-04 21:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_stats'),
    ]

    operations = [
        migrations.AddField(
            model_name='stats',
            name='daily_xp',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]
