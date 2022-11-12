import pytest 
import json


from api import db 
from werkzeug.security import check_password_hash
from flask_login import current_user, login_user
from api.models.listing import Listing

import sys
sys.path.insert(0, '../api')
import pprint
pprint.pprint(sys.path)

from test_client import create_app
from user import User
from ..listing import get_listing, get_all_listings, get_my_listings


class TestListing:
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
        
        
    def test_get_listing(self):
        listing_id = 1;
        response = get_listing(listing_id)
        assert response.status_code == 200
    
    def test_get_all_listings(self):
        response = get_all_listings()
        assert response.status_code == 200
    
    def test_post_listing(self):
        url = "/api/listing"
        postalCode = 636809
        location = 'Jurong East'
        isRoom = True
        title = 'Jurong East 3 rooms'
        description = "With aircon, \n with gym facilities "
        price = 1005.3
        numRooms = 3
        seller_id = current_user.id
        new_listing = Listing(postalCode=postalCode, location=location, isRoom=isRoom, title=title,
                          description=description, price=price, numRooms=numRooms, seller_id=seller_id)

        response = self.app.post(url, json.dumps(new_listing))
        
        assert response.status_code == 200
        
        assert response.json()['postalCode'] == 636809
        assert response.json()['locatoin'] == 'Jurong East'
        assert response.json()['isRoom'] == True
        assert response.json()['title'] == 'Jurong East 3 rooms'
        assert response.json()['description'] ==  "With aircon, \n with gym facilities "
        assert response.json()['price'] == 1005
        assert response.json()['numRooms'] == 3
        
    
    def test_get_my_listings(self):
        response = get_my_listings()
        assert response.status_code == 200