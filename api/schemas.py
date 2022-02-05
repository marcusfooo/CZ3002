from xml.etree.ElementInclude import include
from api import ma
from .models.user import User
from .models.listing import Listing


class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User


class ListingSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Listing
    seller = ma.Nested(UserSchema(only=("email",)))
