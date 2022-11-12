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
from ..model import model_req

class TestModel:
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
    
    def test_model_req_success(self):
        response = model_req()
        assert response.json() is not None
        
    
    def test_model_req_fail(self):
        response = model_req()
        assert response.status_code == 200
    