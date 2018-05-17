from django.db import models

class Message(models.Model):
    content = models.CharField(max_length=100)
    messageID = models.CharField(max_length=50)
    username = models.CharField(max_length=50)
    
    class Meta:
        verbose_name = "Message"
        verbose_name_plural = "Messages"
        # ordering = ('messageID', )
    def __unicode__(self):
        return self.content

class Comments(models.Model):
    content = models.CharField(max_length=100)
    commentID = models.CharField(max_length=50)
    message = models.ForeignKey(Message, related_name='comments', on_delete=models.CASCADE)
    def __str__(self):
        return self.content

    

 
