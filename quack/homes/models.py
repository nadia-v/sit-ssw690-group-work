from django.db import models

class Home(models.Model):
    image = models.ImageField(upload_to='images/')
    service = models.CharField(max_length=50)

    def __str__(self):
        return self.service