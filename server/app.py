# app.py - Flask application for managing user sessions and events.

from datetime import datetime, timedelta, timezone
from flask import Flask, json
from flask_cors import CORS, cross_origin
from flask_jwt_extended import JWTManager, create_access_token, get_jwt, get_jwt_identity, jwt_required
import pymongo
import urllib.parse
from dotenv import load_dotenv
import os
import base64
import jwt

load_dotenv()

USERNAME = os.getenv('USERNAME')
PASSWORD = os.getenv('PASSWORD')
encoded_secret = os.getenv("SECRET_KEY_BASE64")
SECRET_KEY = base64.b64decode(encoded_secret)

username = urllib.parse.quote_plus(USERNAME)
password = urllib.parse.quote_plus(PASSWORD)

# Correctly formatted URI
uri = f"mongodb+srv://{username}:{password}@cluster0.q9ngmv0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
# Database
client = pymongo.MongoClient(uri)
db = client.henon

app = Flask(__name__)
app.secret_key = SECRET_KEY
app.config['JWT_SECRET_KEY'] = SECRET_KEY
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

# @app.after_request - This function is called after every request
# It checks if the JWT token is about to expire and refreshes it if necessary
# It adds the new token to the response data
@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response

cors = CORS(app)
jwt = JWTManager(app)
app.config['CORS_HEADERS'] = 'Content-Type'

from user.routes import user_routes
from event.routes import event_routes
# Register the blueprints
app.register_blueprint(event_routes)
app.register_blueprint(user_routes)