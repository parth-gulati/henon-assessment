import uuid
from flask import jsonify, request
from datetime import datetime, timezone
from app import db
from flask_jwt_extended import jwt_required, get_jwt_identity

"""
    Event class to handle event management.
    This class provides methods for creating, editing, deleting, and fetching events.
    It uses JWT for session management and MongoDB for data storage.
    Attributes:
        db: MongoDB database instance. -> not class attribute, imported from app.py
    Methods:
        create_event(): Creates a new event in the database.
        edit_event(): Edits an existing event in the database.
        get_user_events(): Fetches all events for the current user.
        delete_event(): Deletes an event from the database.
"""
class Event:
    @jwt_required()
    def create_event(self):
        try:
            current_user = get_jwt_identity()
            
            if not current_user:
                return jsonify({"status": "error", "message": "Invalid JWT token"}), 401
            
            event = {
                "_id": uuid.uuid4().hex,
                "user_email": current_user,
                "title": request.json.get("title"),
                "type": request.json.get("type"),
                "from": request.json.get("from"),
                "to": request.json.get("to"),
            }

            # Validation checks

            if not event['title'] or not event['type']:
                return jsonify({"status": "error", "message": "Title or type cannot be empty"}), 500

            if not event["from"] or not event["to"]:
                return jsonify({"status": "error", "message": "From or to date cannot be empty"}), 500

            if not bool(datetime.fromisoformat(event["from"])) or not bool(datetime.fromisoformat(event["to"])):
                return jsonify({"status": "error", "message": "Invalid date format"}), 500
            
            event['from'] = datetime.fromisoformat(event["from"])
            event['to'] = datetime.fromisoformat(event["to"])

            # validation checks 
            if event['from'] > event['to']:
                return jsonify({"status": "error", "message": "From date cannot be greater than to date"}), 500
            if event['from'] < datetime.now(timezone.utc):
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
    def edit_event(self):
        try:
            current_user = get_jwt_identity()
            
            if not current_user:
                return jsonify({"status": "error", "message": "Invalid JWT token"}), 401
            
            event = {
                "_id": uuid.uuid4().hex,
                "user_email": current_user,
                "title": request.json.get("title"),
                "type": request.json.get("type"),
                "from": request.json.get("from"),
                "to": request.json.get("to"),
            }

            # Validation checks

            if not event['title'] or not event['type']:
                return jsonify({"status": "error", "message": "Title or type cannot be empty"}), 500

            if not db.events.find_one({"title": event['title']}):
                return jsonify({"status": "error", "message": "Event not found"}), 404

            if not event["from"] or not event["to"]:
                return jsonify({"status": "error", "message": "From or to date cannot be empty"}), 500

            if not bool(datetime.fromisoformat(event["from"])) or not bool(datetime.fromisoformat(event["to"])):
                return jsonify({"status": "error", "message": "Invalid date format"}), 500

            event['from'] = datetime.fromisoformat(event["from"])
            event['to'] = datetime.fromisoformat(event["to"])

            if event['from'] > event['to']:
                return jsonify({"status": "error", "message": "From date cannot be greater than to date"}), 500
            if event['from'] < datetime.now(timezone.utc):
                return jsonify({"status": "error", "message": "From date cannot be in the past"}), 500
            if event['from'] == event['to']:
                return jsonify({"status": "error", "message": "From date cannot be equal to to date"}), 500
            
            result = db.events.update_one(
                {"title": event['title'], "user_email": current_user},
                {"$set": {
                    "type": event["type"],
                    "from": event["from"],
                    "to": event["to"]
                }})

            if result.modified_count:
                return jsonify({"status": "success", "message": "Event updated successfully"}), 201
            else:
                return jsonify({"status": "success", "message": "No updates needed"}), 200

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