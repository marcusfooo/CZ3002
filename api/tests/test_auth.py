# # import sys
# # sys.path.insert(0, '../models/')
# # import user

# from test_client import create_app
# # from api import db
# import sys
# sys.path.insert(0, '../')
# from models.user import User


# def test_signup_post_success():
#     app = create_app()
#     client = app.test_client()
#     url = '/api/signup'
    
#     email = 'shaoyk0212@gmail.com'
#     password = '123456789'
#     new_user = User(email=email, password=password)
    
#     response = client.post(url,
#                           new_user)
    
#     assert response.status_code == 200
import pytest 

class TestAuth:
    def test_login_post_success(self):
        return 0
    
    def test_login_post_wrong_password(self):
        return 0
    
    def test_login_post_email_unverified(self):
        return 0
    
    def test_signup_post_success(self):
        return 0
    
    def test_signup_post_invalid_pw(self):
        return 0
    
    def test_signup_post_email_exists(self):
        return 0

    def test_confirm_email_success(self):
        return 0

    def test_confirm_email_expired(self):
        return 0

    def test_send_confirm_email(self):
        return 0