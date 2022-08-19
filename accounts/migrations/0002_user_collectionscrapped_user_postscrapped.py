# Generated by Django 4.0.5 on 2022-08-20 02:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0002_post_collection'),
        ('collection', '0001_initial'),
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='collectionScrapped',
            field=models.ManyToManyField(related_name='refUser', to='collection.collection'),
        ),
        migrations.AddField(
            model_name='user',
            name='postScrapped',
            field=models.ManyToManyField(related_name='refUser', to='post.post'),
        ),
    ]
