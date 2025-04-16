from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from user.models import User

user_routes = Blueprint('user', __name__)

@user_routes.route('/user/signup', methods=['POST'])
def signup():
    return User().signup()

@user_routes.route('/user/signout', methods=['POST'])
def signout():
    return User().sign_out()

@user_routes.route('/user/signin', methods=['POST'])
def signin():
    return User().login()

@user_routes.route('/user/getuser', methods=['GET'])
@jwt_required()
def get_user():
    return User().get_user()