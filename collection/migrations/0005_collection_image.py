# Generated by Django 4.0.5 on 2022-08-20 00:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('collection', '0004_collection_news'),
    ]

    operations = [
        migrations.AddField(
            model_name='collection',
            name='image',
            field=models.URLField(null=True),
        ),
    ]
