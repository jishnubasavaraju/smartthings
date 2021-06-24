from mongoengine import *

class Capb(Document):
    capbid = StringField(max_length=255,primary_key=True)
    name = StringField(max_length=255)
    status = StringField(max_length=255)
    version = IntField()
    attributes = DictField()
    commands = DictField()
