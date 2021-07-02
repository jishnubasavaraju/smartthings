from django.shortcuts import render
from rest_framework import serializers
from rest_framework_mongoengine import serializers as mongoserializers
from rest_framework_mongoengine import viewsets as mongoviewsets
from rest_framework_mongoengine import validators as mongovalidators
from .models import Capb

class CapsSerializer(mongoserializers.DocumentSerializer):
    capbid = serializers.CharField(
        required=True,
        validators=[
            mongovalidators.UniqueValidator(queryset=Capb.objects),
        ],
    )
    class Meta:
        model = Capb
        fields = '__all__'



class CapsViewSet(mongoviewsets.ModelViewSet):
    serializer_class = CapsSerializer
    queryset = Capb.objects.all()
    lookup_url_kwarg = "capbid"
    lookup_field = "capbid"
