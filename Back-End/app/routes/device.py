from . import device_bp
from flask import jsonify
from .. import mongo
from bson import ObjectId

@device_bp.route('/devices', methods=['GET'])
def devices():
    pass

@device_bp.route('/devices/new', methods=['GET'])
def create_device():
    pass

@device_bp.route('/devices/<device_id>', methods=['GET'])
def get_device_details(device_id):
    pass

@device_bp.route('devices/<device_id>/edit', methods=['PUT'])
def edit_device(device_id):
    pass

@device_bp.route('devices/<device_id>/delete', methods=['POST'])
def delete_device(device_id):
    pass

