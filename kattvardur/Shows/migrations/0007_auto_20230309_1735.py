# Generated by Django 3.2.8 on 2023-03-09 17:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Breeds', '0001_initial'),
        ('Awards', '0002_auto_20230309_1735'),
        ('Shows', '0006_auto_20211010_0024'),
    ]

    operations = [
        migrations.AddField(
            model_name='judgement',
            name='certification',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.DO_NOTHING, to='Awards.certification'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='judgement',
            name='ems',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.DO_NOTHING, to='Breeds.ems'),
            preserve_default=False,
        ),
    ]