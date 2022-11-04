import pytest, os 
from api import db 
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import current_user, login_user, login_required, logout_user
from itsdangerous import SignatureExpired, URLSafeTimedSerializer
import time 


import sys
# sys.path.insert(0, '../api')
# import pprint
# pprint.pprint(sys.path)

from test_client import create_app
from user import User
from ..auth import login_post, logout, confirm_email, send_confirm_email


auth_s = URLSafeTimedSerializer("secret key")


class TestAuth:
    
    @pytest.fixture(scope='session', autouse=True)
    def app(self):
        print("running test_auth.py")

        self.app = create_app()
        self.client = self.app.test_client()

        with self.app.app_context():
            db.create_all()
            yield self.app
            db.session.remove()
            db.drop_all()       

        
    def test_login_post_success(self):
        email = 'shaoyk0212@gmail.com'
        password = '123456789'
        user = User.query.filter_by(email=email).first()

        assert user 
        assert check_password_hash(user.password, password)
        
        login_user(user)
        assert current_user.username == email
        # pass
        
    
    def test_login_post_wrong_password(self):
        email = 'shaoyk0212@gmail.com'
        password = 'abddfsfdfsx'
        
        user = User.query.filter_by(email=email).first()
        assert check_password_hash(user.password, password) == False
        # pass
        
    
    def test_login_post_email_unverified(self):
        email = 'shaoyk0212@gmail.com'
        password = 'abddfsfdfsx'
        
        user = User.query.filter_by(email=email).first()     
        assert user.isVerified == False
        # pass
        
    
    def test_signup_post_success(self):
        url = '/api/singup'
        email = 'shao0041@e.ntu.edu.sg'
        password = '123456789'
        
        user = User.query.filter_by(email=email).first()
        
        password = generate_password_hash(password, method='sha256')
        new_user = User(email=email, password=password)
        
        assert user == False   
        # pass
    
    def test_signup_post_invalid_pw(self):
        url = '/api/singup'
        email = 'shao0041@e.ntu.edu.sg'
        password = '123459'
        
        user = User.query.filter_by(email=email).first()
        
        password = generate_password_hash(password, method='sha256')
        new_user = User(email=email, password=password)
        
        assert len(password) < 8
        # pass
    
    
    def test_signup_post_email_exists(self):
        email = 'shaoyk0212@gmail.com'
        password = 'abddfsfdfsx'
        
        user = User.query.filter_by(email=email).first()
        assert user == True 
        # pass
        
        
    
    def test_logout(self):
        email = 'shaoyk0212@gmail.com'
        password = '123456789'
        user = User.query.filter_by(email=email).first()
        
        login_post(user)
        
        response = logout()
        assert response.status_code == 200
        # pass

    def test_confirm_email_success(self):
        email = 'shao0041@e.ntu.edu.sg'
        token = auth_s.dumps(email, salt='email-confirm')
        
        response = confirm_email(token)
        assert response.status_code == 200
        
        

    def test_confirm_email_expired(self):
        email = 'shao0041@e.ntu.edu.sg'
        token = auth_s.dumps(email, salt='email-confirm', expires_in=0.0001)
        time.sleep(0.0002)
        response = confirm_email(token)
        assert response.status_code == 401
        # pass

    def test_send_confirm_email(self):
        response = send_confirm_email()
        assert response.status_code ==200
        # pass