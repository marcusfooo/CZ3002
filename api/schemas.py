from xml.etree.ElementInclude import include
from api import ma
from api.models.bid import Bid
from .models.listingimage import ListingImage
from .models.user import User
from .models.listing import Listing


class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User


class ListingImageSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = ListingImage


class ListingSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Listing
    seller = ma.Nested(UserSchema(only=("email",)))
    images = ma.Nested(ListingImageSchema, many=True)


class BiddingSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Bid
    bidder = ma.Nested(UserSchema(only=("email",)))
    listing = ma.Nested(Listing)
