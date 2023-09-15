from django.db import models
from django.db import connection

class DirectoryList(models.Model):
    unique_id = models.CharField(max_length=255, primary_key=True)
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

    @property
    def name(self):
        return "%s / %s / %s" % (self.farm_name, self.flock_name, self.house_name)
