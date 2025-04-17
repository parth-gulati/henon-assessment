import uuid
from flask import jsonify, request
from datetime import datetime
from app import db
from flask_jwt_extended import jwt_required, get_jwt_identity
from helpers import DATE_FORMAT

class Event:
    @jwt_required()
    def create_event(self):
        try:
            current_user = get_jwt_identity()
            from_date = request.json.get("from")
            to_date = request.json.get("to")

            if not current_user:
                return jsonify({"status": "error", "message": "Invalid JWT token"}), 401
            if not from_date or not to_date:
                return jsonify({"status": "error", "message": "From or to date cannot be empty"}), 500
            
            if not bool(datetime.strptime(from_date, DATE_FORMAT)) or not bool(datetime.strptime(to_date, DATE_FORMAT)):
                return jsonify({"status": "error", "message": "Invalid date format"}), 500

            event = {
                "_id": uuid.uuid4().hex,
                "user_email": current_user,
                "title": request.json.get("title"),
                "type": request.json.get("type"),
                "from": datetime.strptime(request.json.get("from"), DATE_FORMAT),
                "to": datetime.strptime(request.json.get("to"), DATE_FORMAT),
            }

            if not event['title'] or not event['type']:
                return jsonify({"status": "error", "message": "Title or type cannot be empty"}), 500
            
            # validation checks 
            if event['from'] > event['to']:
                return jsonify({"status": "error", "message": "From date cannot be greater than to date"}), 500
            if event['from'] < datetime.now():
                return jsonify({"status": "error", "message": "From date cannot be in the past"}), 500
            if event['from'] == event['to']:
                return jsonify({"status": "error", "message": "From date cannot be equal to to date"}), 500
            
            if db.events.find_one({"title": event['title']}):
                return jsonify({"status": "error", "message": "Event with same name already exists"}), 500

            if db.events.insert_one(event):
                return jsonify({"status": "success", "message": "Event created successfully", "data": event}), 201

            return jsonify({"status": "error", "message": "Event creation failed"}), 400
        except Exception as e:
            return jsonify({"status": "error", "message": "An error occurred", "error": str(e)}), 500

    @jwt_required()
    def get_user_events(self):
        try:
            current_user = get_jwt_identity()
            if not current_user:
                return jsonify({"status": "error", "message": "Invalid JWT token"}), 401

            events = list(db.events.find({"user_email": current_user}))
            return jsonify({"status": "success", "data": {"events": events}}), 200
        except Exception as e:
            return jsonify({"status": "error", "message": "An error occurred", "error": str(e)}), 500

    @jwt_required()
    def delete_event(self):
        try:
            current_user = get_jwt_identity()
            if not current_user:
                return jsonify({"status": "error", "message": "Invalid JWT token"}), 401
            if db.events.find_one_and_delete({
                "title": request.json.get("title")
            }):
                return jsonify({"status": "success", "message": "Deleted event successfully"}), 200
        except:
            return jsonify({"status": "error", "message": "Unable to delete, invalid title"}), 500
        return jsonify({"status": "error", "message": "Unable to delete, invalid title"}), 500