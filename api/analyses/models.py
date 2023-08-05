from django.db import models


class DirectoryList(models.Model):
    name = models.TextField()
    farm_id = models.IntegerField()
    flock_id = models.IntegerField()
    house_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'directory_list'
