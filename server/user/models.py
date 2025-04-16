import uuid
from flask import jsonify, request, session
from passlib.hash import pbkdf2_sha256
from app import db, jwt
from datetime import datetime
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager

class User:
    def start_session(self, user):
        del user['password']
        session['logged_in'] = True
        session['user'] = user
        access_token = create_access_token(identity=user['email'])
        return jsonify({"status": "success", "message": "User logged in", "data": {"access_token": access_token}}), 200

    def sign_out(self):
        session.clear()
        response = jsonify({"status": "success", "message": "User logged out"})
        unset_jwt_cookies(response)
        return response, 200

    def signup(self):
        user = {
            "_id": uuid.uuid4().hex,
            "first_name": request.json.get('first_name'),
            "last_name": request.json.get('last_name'),
            "email": request.json.get("email"),
            "password": request.json.get("password"),
            "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }

        user['password'] = pbkdf2_sha256.encrypt(user['password'])

        print(user)
        
        if db.users.find_one({"email": user['email']}):
            return jsonify({"status": "error", "message": "Email already in use"}), 400

        if db.users.insert_one(user):
            return self.start_session(user)
        
        return jsonify({"status": "error", "message": "Signup failed"}), 400
    
    def login(self):
        user = db.users.find_one({
            "email": request.json.get("email"),
        })
        
        if user and pbkdf2_sha256.verify(request.json.get('password'), user['password']):
            return self.start_session(user)
        
        return jsonify({"status": "error", "message": "Invalid email or password"}), 401
    
    def get_user(self):
        try:
            current_user = get_jwt_identity()
            if not current_user:
                return jsonify({"status": "error", "message": "Invalid JWT token"}), 401
            
            user = db.users.find_one({
                "email": current_user
            })

            if user:
                del user['password']
                return jsonify({"status": "success", "data": {"user": user}}), 200
            return jsonify({"status": "error", "data": "Some error has occured"}), 401
        except:
            return jsonify({"status": "error", "data": "Some error has occured"}), 401