from django.db import models
from django.db import connection


class DirectoryList(models.Model):
    unique_id = models.CharField(max_length=255, primary_key=True)
    farm_name = models.TextField()
    farm_id = models.IntegerField()
    flock_id = models.IntegerField()
    flock_name = models.TextField()
    hatchery_id = models.IntegerField()
    hatchery_name = models.TextField()
    house_id = models.IntegerField()
    house_name = models.TextField()
    pen_id = models.IntegerField()
    pen_name = models.TextField()

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
        return "{farm} / {house} / {pen} / {flock}".format(farm=self.farm_name, house=self.house_name, pen=self.pen_name, flock=self.flock_name)

    @property
    def display_name(self):
        return "{farm} / {house} / {pen} / {flock}".format(farm=self.farm_name, house=self.house_name, pen=self.pen_name, flock=self.flock_name)

    @property
    def batch_name(self):
        return "{house} / {pen} / {flock}".format(house=self.house_name, pen=self.pen_name, flock=self.flock_name)
