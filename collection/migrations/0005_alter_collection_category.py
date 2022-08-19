# Generated by Django 4.0.5 on 2022-08-19 21:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('collection', '0004_collection_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='collection',
            name='category',
            field=models.CharField(choices=[('politics', '정치'), ('economy', '경제'), ('society', '사회'), ('culture', '생활/문화'), ('science', 'IT/과학'), ('world', '세계')], max_length=120),
        ),
    ]
