# Generated by Django 3.2.8 on 2023-03-13 13:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Cats', '0014_cat_comment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cat',
            name='comment',
            field=models.TextField(default=''),
        ),
    ]
