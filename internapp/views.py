from django.shortcuts import render
from rest_framework_mongoengine import serializers
from rest_framework_mongoengine import viewsets
from .models import Capb

class CapsSerializer(serializers.DocumentSerializer):
    class Meta:
        model = Capb
        fields = '__all__'



class CapsViewSet(viewsets.ModelViewSet):
    serializer_class = CapsSerializer
    queryset = Capb.objects.all()