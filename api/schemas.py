from api import ma
from .models.listing import Listing


class ListingSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Listing
