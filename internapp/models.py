from mongoengine import *

class Capb(Document):
<<<<<<< HEAD
    capbid = StringField(max_length=255,primary_key=True)
=======
    capbid = StringField(max_length=255, primary_key=True)
>>>>>>> 554d878cc55d5199e65acb852336ce66aa0309f2
    name = StringField(max_length=255)
    status = StringField(max_length=255)
    version = IntField()
    attributes = DictField()
    commands = DictField()
