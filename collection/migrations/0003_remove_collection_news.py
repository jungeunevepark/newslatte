# Generated by Django 4.0.5 on 2022-08-19 23:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('collection', '0002_collection_news'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='collection',
            name='news',
        ),
    ]