from . import user_bp
from flask import jsonify, request, url_for, session
from .. import mongo
from flask_pymongo import ObjectId
from bson import ObjectId
from ..webscraper import itemToBeFound
import requests

def convert_document(document):
    """Convert ObjectId to string for JSON serialization."""
    for key, value in document.items():
        if isinstance(value, ObjectId):
            document[key] = str(value)
    return document


@user_bp.route('/users', methods=['GET'])
def users():
    try:
        cursor = mongo.db.user_collection.find()
        data = [convert_document(document) for document in cursor]
        if data:
            return jsonify(data)
    except Exception as e:
        return f'Error fetching data: {e}'
    

@user_bp.route('/users/customers', methods=['GET'])
def get_customers():
    try:
        cursor = mongo.db.user_collection.find()
        data = [convert_document(document) for document in cursor]
        data = [x for x in data if x['role']=="customer"]
        if data:
            return jsonify(data)
        else:
            return jsonify([])
    except Exception as e:
        return f'Error fetching data: {e}'

    
@user_bp.route('/users/staff', methods=['GET'])
def get_staff():
    try:
        cursor = mongo.db.user_collection.find()
        data = [convert_document(document) for document in cursor]
        data = [x for x in data if x['role']=="staff"]
        if data:
            return jsonify(data)
        else:
            return jsonify([])
    except Exception as e:
        return f'Error fetching data: {e}'
    
@user_bp.route('/users/admins', methods=['GET'])
def get_admin():
    try:
        cursor = mongo.db.user_collection.find()
        data = [convert_document(document) for document in cursor]
        data = [x for x in data if x['role']=="admin"]
        if data:
            return jsonify(data)
        else:
            return jsonify([])
    except Exception as e:
        return f'Error fetching data: {e}'


@user_bp.route('/users/new', methods=['POST'])
def create_user():
    try:
        data = request.json
        user_dict = {}
        for k, v in data.items():
            user_dict[k] = v
        res = mongo.db.user_collection.insert_one(user_dict)
        res = mongo.db.user_collection.find_one(user_dict)
        res = convert_document(res)
        return jsonify(res), 200
    except Exception as e:
        return f'Error fetching data: {e}'
    

@user_bp.route('/users/<user_id>', methods=['GET'])
def get_user_details(user_id):
    try:
        userid_dict = {"user_id": user_id}
        res=mongo.db.user_collection.find_one(userid_dict)
        if res != None:
            return jsonify(convert_document(res)), 200
    except Exception as e:
        return f'Error fetching data: {e}'
    

@user_bp.route('/users/email/<email>', methods=['GET'])
def get_user_details_from_email(email):
    try:
        userid_dict = {"email": email}
        res=mongo.db.user_collection.find_one(userid_dict)
        if res != None:
            return jsonify(convert_document(res)), 200
    except Exception as e:
        return f'Error fetching data: {e}'
    


@user_bp.route('/users/<user_id>/edit', methods=['PUT'])
def edit_user(user_id):
    try:
        data = request.get_json()
        user_dict = {}
        for k, v in data.items():
            user_dict[k] = v

        search_criteria = {'user_id': data.get('user_id')}


        res = mongo.db.user_collection.update_one(search_criteria, {'$set': data})
        
        if res.modified_count > 0:
            return jsonify(user_dict), 200
        else:
            return jsonify({'error': 'Item not found or no changes made'}), 404

    except Exception as e:
        return f'Error: {e}'
    

@user_bp.route('/users/<user_id>/delete', methods=['GET'])
def delete_user(user_id):
    try:
        user_dict = {"user_id": user_id}


        item_to_delete = mongo.db.user_collection.find_one(user_dict)



        if item_to_delete != None:

            res = mongo.db.user_collection.delete_one(user_dict)
            
            if res.deleted_count > 0:
                return jsonify(convert_document(item_to_delete)), 200
        else:
            return jsonify({'error': 'Item not found or no changes made'}), 404

    except Exception as e:
        return f'Error: {e}'
    
@user_bp.route('/users/<user_id>/devices', methods=['GET'])
def get_user_devices(user_id):
    try:
        user_dict = {"user_id": user_id}
        devices_to_find = mongo.db.order_collection.find(user_dict)
        if devices_to_find  != None:
            data = [convert_document(document) for document in devices_to_find]
            data = [device["device_id"] for device in data]
            data = [mongo.db.device_collection.find_one({"device_id": dev}) for dev in data]
            data = [convert_document(dev) for dev in data]
            return jsonify(data), 200

    except Exception as e:
        return f'Error: {e}', 404
    

@user_bp.route('/users/<user_id>/orders', methods=['GET'])
def get_user_orders(user_id):
    try:
        user_dict = {"user_id": user_id}
        devices_to_find = mongo.db.order_collection.find(user_dict)
        if devices_to_find  != None:
            data = [convert_document(document) for document in devices_to_find]
            return jsonify(data), 200

    except Exception as e:
        return f'Error: {e}', 404
    

@user_bp.route('/scraper/cex/<string:device_name>', methods=['GET'])
def get_device_from_web(device_name):
    try:
        return jsonify(itemToBeFound(device_name))
    except Exception as e:
        return f'Error: {e}', 404

@user_bp.route('/users/<user_id>/devices/<device_id>/flag', methods=["GET"])
def flag_user_device(user_id, device_id):
    try:
        user_dict = {"device_id": device_id}
        devices_to_find = mongo.db.device_collection.find_one(user_dict)
        if devices_to_find != None:
            device = convert_document(devices_to_find)
            device['flag'] = not device['flag']
            device.pop("_id")

            url = url_for('device.edit_device', device_id=device_id)
            return jsonify({"url": url})

    except Exception as e:
        return f'Error: {e}', 404