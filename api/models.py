from flask_login import UserMixin
from . import db
from datetime import datetime
from . import ma


class User(UserMixin, db.Model):
    # primary keys are required by SQLAlchemy
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    listings = db.relationship("Listing", backref="user")


class Listing(db.Model):
    # primary keys are required by SQLAlchemy
    id = db.Column(db.Integer, primary_key=True)
    postalCode = db.Column(db.Integer, nullable=False)
    location = db.Column(db.String(30), nullable=False)
    isRoom = db.Column(db.Boolean, nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500))
    price = db.Column(db.Float, nullable=False)
    numRooms = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.utcnow)
    seller_id = db.Column(db.Integer, db.ForeignKey("user.id"))


class ListingSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Listing
