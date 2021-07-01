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
    lookup_url_kwarg = "capbid"
    
    def get_queryset(self):
        cid = self.kwargs.get(self.lookup_url_kwarg)
        print(cid)
        print("Here")
        comments = []
        if cid == "" or cid is None:
            comments = Capb.objects.filter(capbid="accelerationSensor")
        else:
            comments = Capb.objects.filter(capbid="airConditionerMode")
        return comments
   