# Generated by Django 4.2.6 on 2024-01-07 22:34

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_alter_stats_last_reviewed_language_code'),
    ]

    operations = [
        migrations.CreateModel(
            name='Test',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('test', models.DateField(default=django.utils.timezone.now)),
            ],
        ),
    ]