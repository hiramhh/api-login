# Generated by Django 4.0 on 2022-11-21 15:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('programas', '0001_initial'),
        ('university', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='programs',
            name='university',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='university.university'),
        ),
    ]
