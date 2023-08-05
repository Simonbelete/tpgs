from django.db import models


class DirectoryList(models.Model):
    farm_name = models.TextField()
    farm_id = models.IntegerField()
    flock_id = models.IntegerField()
    flock_name = models.TextField()
    house_id = models.IntegerField()
    house_name = models.TextField()

    class Meta:
        managed = False
        db_table = 'directory_list'

    @classmethod
    def refresh_view(cl):
        with connection.cursor() as cursor:
            cursor.execute(
                "REFRESH MATERIALIZED VIEW CONCURRENTLY directory_list")
