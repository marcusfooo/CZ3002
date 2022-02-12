from sqlite3 import dbapi2


from api import db


class Bid(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    listing_id = db.Column(db.Integer, db.ForeignKey("listing.id"))
    listing = db.relationship("Listing", back_populates="bids")
    bidder_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    bidder = db.relationship("User", back_populates="bids")
    amount = db.Column(db.Integer)
