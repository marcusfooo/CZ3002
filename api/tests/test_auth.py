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
    