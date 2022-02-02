from flask import Blueprint, jsonify, make_response, request
from werkzeug.security import generate_password_hash, check_password_hash
from .models import User
from flask_login import current_user, login_user, login_required, logout_user
from . import db

auth = Blueprint('auth', __name__)


@auth.route("/user", methods=["GET"])
@login_required
def get_user():
    return make_response(jsonify({"id": current_user.id, "email": current_user.email}))


@auth.route('/login', methods=['POST'])
def login_post():
    # login code goes here
    email = request.json['email']
    password = request.json['password']

    user = User.query.filter_by(email=email).first()

    # check if the user actually exists
    # take the user-supplied password, hash it, and compare it to the hashed password in the database
    if not user or not check_password_hash(user.password, password):
        response = make_response(
            jsonify({"message": "Email or Password incorrect."}), 400)
        return response
    # if the above check passes, then we know the user has the right credentials
    login_user(user)
    return make_response(jsonify({"message": "Successfully authenticated"}), 200)


@auth.route('/signup', methods=['POST'])
def signup_post():
    # code to validate and add user to database goes here
    email = request.json["email"]
    password = request.json["password"]

    # if this returns a user, then the email already exists in database
    user = User.query.filter_by(email=email).first()

    if user:  # if a user is found, we want to redirect back to signup page so user can try again
        response = make_response(
            jsonify({"message": "Email already exists please try again."}), 400)
        return response

    # create a new user with the form data. Hash the password so the plaintext version isn't saved.
    new_user = User(email=email, password=generate_password_hash(
        password, method='sha256'))

    # add the new user to the database
    db.session.add(new_user)
    db.session.commit()
    login_user(user)
    response = make_response(jsonify({"message": "Signed up"}))
    return response


@auth.route('/logout', methods=["GET"])
@login_required
def logout():
    logout_user()
    return make_response(jsonify({"message": "Logged out"}), 200)
