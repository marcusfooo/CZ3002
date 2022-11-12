import pytest 
import json


from api import db 
from werkzeug.security import check_password_hash
from flask_login import current_user, login_user
from api.models.listing import Listing

import sys, io
sys.path.insert(0, '../api')
import pprint
pprint.pprint(sys.path)

from test_client import create_app
from user import User
from ..listing import get_images, upload_image, upload_profile_image

class TestImage:
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
        
        
    def test_get_listing_images(self):
        listing_id = 1;
        response = get_images(listing_id)
        assert response.status_code == 200
    
    def test_upload_listing_images_success(self):
        url = "/api/images"
        file_name = "room1.jpg"
        data = {
        'image': (io.BytesIO(b"room 1 image"), file_name)
    }
        response = self.app.post(url, data = data)
        assert response.status_code == 200
        assert response.json()['image'] == file_name
        
    
    def test_upload_listing_images_fail(self):
        url = "/api/images"
        file_name = "room1.txt"
        data = {
        'image': (io.BytesIO(b"room 1 image"), file_name)
    }
        response = self.app.post(url, data = data)
        assert response.status_code == 500


    def test_upload_profile_image_success(self):
        url = "/api/profile-image"
        file_name = "profile.jpg"
        data = {
        'image': (io.BytesIO(b"room 1 image"), file_name)
    }
        response = self.app.post(url, data = data)
        assert response.status_code == 200
        assert response.json()['image'] == file_name
    
    def test_upload_profile_image_fail(self):
        url = "/api/profile-image"
        file_name = "profile.txt"
        data = {
        'image': (io.BytesIO(b"room 1 image"), file_name)
    }
        response = self.app.post(url, data = data)
        assert response.status_code == 500
    