# Generated by Django 3.2.8 on 2023-03-22 18:40

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('Cats', '0021_rename_fenotypecolor_phenotypecolor'),
    ]

    operations = [
        migrations.AlterField(
            model_name='catcolor',
            name='date',
            field=models.DateField(blank=True, default=django.utils.timezone.now, null=True),
        ),
        migrations.AlterField(
            model_name='phenotypecolor',
            name='date',
            field=models.DateField(blank=True, default=django.utils.timezone.now, null=True),
        ),
    ]