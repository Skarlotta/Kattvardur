# Generated by Django 3.2.8 on 2023-03-18 13:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Cats', '0017_alter_registry_organization'),
    ]

    operations = [
        migrations.AddField(
            model_name='cat',
            name='off_registry',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='cat',
            name='country',
            field=models.CharField(blank=True, default='', max_length=4, null=True),
        ),
    ]
