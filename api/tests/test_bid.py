import pytest 
import json


from api import db 
from werkzeug.security import check_password_hash
from flask_login import current_user, login_user
from api.models.listing import Listing
import requests 

import sys
sys.path.insert(0, '../api')
import pprint
pprint.pprint(sys.path)

from test_client import create_app
from user import User
from ..bid import get_bids, get_highest_bid, get_own_bids, place_bid, update_bid_status

class TestBid:
    
    @pytest.fixture(scope='session', autouse=True)
    def app(self):
        print("running test_auth.py")

        self.app = create_app()
        self.client = self.app.test_client()
        
        self.email = 'shaoyk0212@gmail.com'
        self.password = '123456789'
        check_password_hash(self.user.password, self.password)
        self.user = User.query.filter_by(email=self.email).first()
        login_user(self.user)
        

        with self.app.app_context():
            db.create_all()
            yield self.app
            db.session.remove()
            db.drop_all()     

    def test_get_bids_owner(self):
        listing_id=1;
        listing = Listing.query.filter(
        Listing.id == listing_id, Listing.seller_id == current_user.id).first();
        assert listing is not None;
        
        response = get_bids(listing_id);
        assert response.status_code == 200;        
        
    
    def test_get_own_bids(self):
        listing_id=1;
        listing = Listing.query.filter(
        Listing.id == listing_id, Listing.seller_id == current_user.id).first();
        assert listing is None;
        
        response = get_own_bids(listing_id);
        assert response.status_code == 200;      
        
    
    def test_get_highest_bid(self):
        listing_id=1;
        response = get_highest_bid(listing_id);
        assert response.status_code == 200;
        
    
    def test_place_bid(self):
        listing_id = 1;
        url = "/api/bids/listing/" + str(listing_id);
        amount = 435.2;
        response = requests.post(url, data=json.dumps(amount));   
        assert response.status_code == 200;  
        
    
    def test_update_bid_approve(self):
        bid_id = 1;
        url = "/api/bids/" + str(bid_id);
        status = 'approved'
        response = self.app.post(url, data = json.dumps(status))
        assert response.status_code == 200;
        
    
    def test_update_bid_reject(self):
        bid_id = 1;
        url = "/api/bids/" + str(bid_id);
        status = 'rejected'
        response = self.app.post(url, data = json.dumps(status))
        assert response.status_code == 200;
    

    