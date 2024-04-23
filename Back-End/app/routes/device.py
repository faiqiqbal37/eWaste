from . import device_bp
from flask import jsonify, request
from .. import mongo
from flask_pymongo import ObjectId
from bson import ObjectId

def convert_document(document):
    """Convert ObjectId to string for JSON serialization."""
    for key, value in document.items():
        if isinstance(value, ObjectId):
            document[key] = str(value)
    return document


@device_bp.route('/devices', methods=['GET'])
def devices():
    try:
        cursor = mongo.db.device_collection.find()
        data = [convert_document(document) for document in cursor]
        if data:
            return jsonify(data)
        else:
            return [], 404
    except Exception as e:
        return f'Error fetching data: {e}'


@device_bp.route('/devices/new', methods=['POST'])
def create_devices():
    try:
        data = request.json
        device_dict = {}
        for k, v in data.items():
            device_dict[k] = v
        res = mongo.db.device_collection.insert_one(device_dict)
        res = mongo.db.device_collection.find_one(device_dict)
        res = convert_document(res)
        return jsonify(res), 200
    except Exception as e:
        return f'Error fetching data: {e}'
    

@device_bp.route('/devices/<device_id>', methods=['GET'])
def get_device_details(device_id):
    try:
        deviceid_dict = {"device_id": device_id}
        res=mongo.db.device_collection.find_one(deviceid_dict)
        if res != None:
            return jsonify(convert_document(res)), 200
        else:
            return jsonify({}), 404
    except Exception as e:
        return f'Error fetching data: {e}'


@device_bp.route('/devices/<device_id>/edit', methods=['PUT'])
def edit_device(device_id):
    try:
        data = request.get_json()
        device_dict = {}
        for k, v in data.items():
            device_dict[k] = v


        
        search_criteria = {'device_id': data.get('device_id')}


        res = mongo.db.device_collection.update_one(search_criteria, {'$set': data})
        
        if res.matched_count:
            return jsonify(device_dict), 200
        else:
            return jsonify({'error': device_id}), 404

    except Exception as e:
        return f'Error: {e}', 404
    

@device_bp.route('/devices/<device_id>/delete', methods=['GET'])
def delete_device(device_id):
    try:
        device_dict = {"device_id": device_id}


        item_to_delete = mongo.db.device_collection.find_one(device_dict)



        if item_to_delete != None:

            res = mongo.db.device_collection.delete_one(device_dict)
            
            
            
            if res.deleted_count > 0:
                return jsonify(convert_document(item_to_delete)), 200
        else:
            return jsonify({'error': 'Item not found or no changes made'}), 404

    except Exception as e:
        return f'Error: {e}'
    

