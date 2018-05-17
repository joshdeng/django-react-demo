# create this file
from django.conf.urls import url
from rest_framework import routers
from project.demo.views import MessageViewSet, CommentsViewSet
 
router = routers.DefaultRouter()
router.register(r'messages', MessageViewSet)
router.register(r'comments', CommentsViewSet)
 
urlpatterns = router.urls