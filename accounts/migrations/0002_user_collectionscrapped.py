# Generated by Django 4.0.6 on 2022-08-15 21:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('collection', '0003_collection_tag'),
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='CollectionScrapped',
            field=models.ManyToManyField(related_name='refUser', to='collection.collection'),
        ),
    ]
