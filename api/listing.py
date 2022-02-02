from locale import currency
from flask import Blueprint, jsonify, make_response, request
from flask_login import current_user, login_required
from .models import Listing
from . import db

listing = Blueprint('listing', __name__)


@listing.route("/<int:listing_id>", methods=["GET"])
def get_listing(listing_id):
    listing = Listing.query.filter_by(id=listing_id).first()
    return make_response(jsonify(listing), 200)


@listing.route("/create-listing", methods=["POST"])
@login_required
def post_listing():
    listing_data = request.get_json()
    postalCode = listing_data["postalCode"]
    location = listing_data["location"]
    isRoom = listing_data["isRoom"]
    title = listing_data["title"]
    description = listing_data["description"]
    price = listing_data["price"]
    numRooms = listing_data["numRooms"]
    created_at = listing_data["created_at"]
    seller_id = current_user.id

    new_listing = Listing(postalCode=postalCode, location=location, isRoom=isRoom, title=title,
                          description=description, price=price, numRooms=numRooms, created_at=created_at, seller_id=seller_id)

    db.session.add(new_listing)
    db.session.commit()
    return make_response(jsonify({"message": "Successfully created new listing"}), 200)
