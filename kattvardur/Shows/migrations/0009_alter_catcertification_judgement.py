# Generated by Django 3.2.8 on 2023-03-09 17:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Shows', '0008_auto_20230309_1747'),
    ]

    operations = [
        migrations.AlterField(
            model_name='catcertification',
            name='judgement',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, to='Shows.judgement'),
        ),
    ]
