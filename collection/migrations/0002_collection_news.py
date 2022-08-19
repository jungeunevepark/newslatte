

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0001_initial'),
        ('collection', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='collection',
            name='news',
            field=models.ManyToManyField(to='news.news'),
        ),
    ]
