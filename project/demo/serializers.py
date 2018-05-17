from rest_framework import serializers
from .models import Message, Comments
 
class MessageSerializer(serializers.ModelSerializer):
    comments = serializers.StringRelatedField(many=True)
    class Meta:
        model = Message
        fields = ('content', 'messageID', 'username', 'comments')
 

class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = '__all__'
 