import io
import os
import boto3
from dotenv import load_dotenv
from flask import Blueprint, jsonify, make_response, request
from flask_login import current_user, login_required
from .models import Listing, ListingSchema
from . import db
from werkzeug.utils import secure_filename

images = Blueprint('images', __name__)

# Get the path to the directory this file is in
BASEDIR = os.path.abspath(os.path.dirname(__file__))

# Connect the path with your '.env' file name
load_dotenv(os.path.join(BASEDIR, '.env'))


@images.route("/images", methods=["PUT"])
def upload_image():
    file = request.files["image"]
    filename = secure_filename(file.filename)
    s3 = boto3.client(
        "s3",
        aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
        aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY')
    )
    try:
        bucket = os.getenv("AWS_BUCKET_NAME")
        s3.upload_fileobj(
            file,
            bucket,
            file.filename,
            ExtraArgs={
                "ACL": "public-read",
                "ContentType": file.content_type
            }
        )

    except Exception as e:
        # This is a catch all exception, edit this part to fit your needs.
        print("Something Happened: ", e)
        return e
    return make_response(jsonify({"message": filename}), 200)
