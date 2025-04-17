from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from event.models import Event
event_routes = Blueprint('event', __name__)

@event_routes.route('/event/create', methods=['POST'])
def create():
    return Event().create_event()

@event_routes.route('/event/get-all', methods=['GET'])
def get_all():
    return Event().get_user_events()

@event_routes.route('/event/delete', methods=['POST'])
def delete_one():
    return Event().delete_event()

@event_routes.route('/event/edit', methods=['PUT'])
def edit():
    return Event().edit_event()