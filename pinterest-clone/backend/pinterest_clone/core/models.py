from django.db.models import Model, ImageField, CharField, TextField, URLField, ForeignKey, ManyToManyField, CASCADE, FileField
from pinterest_clone.users.models import User

class Pin(Model):
    image = ImageField(upload_to='pinterest_clone/storage/pins/')
    title = CharField(max_length=100)
    description = TextField()
    link = URLField()
    author = ForeignKey(User, on_delete=CASCADE, blank=True, related_name="pins")

class Board(Model):
    name = CharField(max_length=100)
    description = TextField(blank=True, null=True)
    cover = FileField(upload_to='pinterest_clone/storage/board_covers/', blank=True)
    author = ForeignKey(User, on_delete=CASCADE, blank=True, related_name="boards")
    pins = ManyToManyField(Pin, blank=True)

    @property
    def total_pins(self):
        return self.pins.all().count()
