import os
from flask import Flask
from flask_cors import CORS
from datetime import timedelta
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_marshmallow import Marshmallow
from dotenv import load_dotenv
from flask_mail import Mail

BASEDIR = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(BASEDIR, '.env'))

db = SQLAlchemy()
ma = Marshmallow()
mail = Mail()


def create_app():
    app = Flask(__name__)

    app.config["APPLICATION_ROOT"] = "/api"
    CORS(app, supports_credentials=True)
    app.config['SECRET_KEY'] = 'secret-key-goes-here'
    #app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
    db_username = os.getenv("DB_USER")
    db_password = os.getenv("DB_PASSWORD")
    db_endpoint = os.getenv("DB_ENDPOINT")
    db_name = os.getenv("DB_NAME")
    db_url = f'mysql+pymysql://{db_username}:{db_password}@{db_endpoint}:3306/{db_name}'
    # print("THE URL IS:", db_url)
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url

    # configurations to prevent lost connection to MySQL
    app.config["SQLALCHEMY_PRE_PING"] = True
    app.config["SQLALCHEMY_POOL_RECYCLE"] = 3600

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # mail configurations
    app.config['MAIL_SERVER'] = 'smtp.sendgrid.net'
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USERNAME'] = 'apikey'
    app.config['MAIL_PASSWORD'] = os.environ.get('SENDGRID_API_KEY')
    app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('MAIL_DEFAULT_SENDER')

    @app.after_request
    def after_request(response):
        response.headers.add('Access-Control-Allow-Headers',
                             'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods',
                             'GET,PUT,POST,DELETE,OPTIONS')
        return response

    db.init_app(app)
    ma.init_app(app)
    mail.init_app(app)

    login_manager = LoginManager()
    login_manager.init_app(app)

    from .models.user import User

    @login_manager.user_loader
    def load_user(user_id):
        # since the user_id is just the primary key of our user table, use it in the query for the user
        return User.query.get(int(user_id))

    # blueprint for auth routes in our app
    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint, url_prefix="/api")

    from .listing import listing as listing_blueprint
    app.register_blueprint(listing_blueprint, url_prefix="/api")

    from .images import images as images_blueprint
    app.register_blueprint(images_blueprint, url_prefix="/api")

    from .bid import bid as bid_blueprint
    app.register_blueprint(bid_blueprint, url_prefix="/api")

    return app
