from flask import Blueprint, jsonify, make_response, request
from flask_login import current_user, login_required

from api.models.bid import Bid
from api.schemas import BiddingSchema
from . import db

bid = Blueprint('bid', __name__)


@bid.route("/bids/listing/<int:listing_id>", methods=["GET"])
def get_bids(listing_id):
    bids = Bid.query.filter_by(listing_id=listing_id)
    bidding_schema = BiddingSchema(many=True)

    return make_response(jsonify({"bids": bidding_schema.dump(bids.all())}), 200)


@bid.route("/bids/user/<int:user_id>", methods=["GET"])
@login_required
def get_own_bids(user_id):
    bids = Bid.query.filter_by(bidder_id=user_id)
    bidding_schema = BiddingSchema(many=True)

    return make_response(jsonify({"bids": bidding_schema.dump(bids.all())}), 200)


@bid.route("/bids/listing/<int:listing_id>", methods=["POST"])
@login_required
def place_bid(listing_id):
    bidding_data = request.get_json()
    amount = bidding_data["amount"]
    bidder_id = current_user.id

    new_bid = Bid(listing_id=listing_id, bidder_id=bidder_id, amount=amount)

    db.session.add(new_bid)
    db.session.commit()
    return make_response(jsonify({"message": "Successfully created new listing", "id": new_bid.id}), 200)
