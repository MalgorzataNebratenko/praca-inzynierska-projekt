# Generated by Django 4.2.6 on 2023-11-16 11:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_remove_appuser_country'),
    ]

    operations = [
        migrations.AddField(
            model_name='appuser',
            name='nationality',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]