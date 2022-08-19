

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [

        ('news', '__first__'),
        ('accounts', '0001_initial'),
        ('post', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Collection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=120, verbose_name='컬렉션제목')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='만든 날짜')),
                ('likes', models.IntegerField(default=0, verbose_name='좋아요수')),
                ('views', models.IntegerField(default=0, verbose_name='조회수')),
                ('refCount', models.IntegerField(default=0, verbose_name='참조수')),
                ('comment', models.CharField(max_length=120, null=True, verbose_name='코멘트')),
                ('category', models.CharField(choices=[('politics', '정치'), ('economy', '경제'), ('society', '사회'), ('culture', '생활/문화'), ('science', 'IT/과학'), ('world', '세계')], max_length=120)),
                ('author', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='accounts.profile', verbose_name='작성자')),
                ('tag', models.ManyToManyField(null=True, to='post.tag')),
            ],
        ),
    ]
