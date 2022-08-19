

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('collection', '0001_initial'),
        ('post', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='collection',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='collection.collection', verbose_name='참조 컬렉션'),
        ),
    ]
