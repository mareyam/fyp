from django.db import models

class Campaign(models.Model):
    name = models.CharField(max_length=200)
    cost = models.IntegerField()

    def __str__(self):
        return self.name + ' ' + self.cost
    
    