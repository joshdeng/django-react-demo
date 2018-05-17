from django.shortcuts import render
from rest_framework import viewsets
from .models import Message, Comments
from .serializers import MessageSerializer, CommentsSerializer
from rest_framework.decorators import action


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer


class CommentsViewSet(viewsets.ModelViewSet):
    queryset = Comments.objects.all()
    serializer_class = CommentsSerializer

