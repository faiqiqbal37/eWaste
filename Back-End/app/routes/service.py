from bson import ObjectId
from . import service_bp
from .. import mongo
from flask import jsonify, request


def convert_document(document):
    """Convert ObjectId to string for JSON serialization."""
    for key, value in document.items():
        if isinstance(value, ObjectId):
            document[key] = str(value)
    return document


@service_bp.route('/service', methods=['GET'])
def service():
    try:
        cursor = mongo.db.service_collection.find()
        data = [convert_document(document) for document in cursor]
        if data:
            return jsonify(data), 200
    except Exception as e:
        return f'Error fetching service: {e}'


@service_bp.route('/service/new', methods=['POST'])
def create_service():
    try:
        data = request.json
        service_dict = {}
        for k, v in data.items():
            service_dict[k] = v

        res = mongo.db.service_collection.insert_one(service_dict)
        res = mongo.db.service_collection.find_one(service_dict)
        res = convert_document(res)
        return jsonify(res), 200
    except Exception as e:
        return f'Error creating service: {e}'


@service_bp.route('/service/<service_id>', methods=['GET'])
def get_service_details(service_id):
    try:
        service_dict = {"service_id": service_id}
        res = mongo.db.service_collection.find_one(service_dict)

        if res is not None:
            return jsonify(convert_document(res)), 200
        else:
            return jsonify({'error': 'Service not found'}), 404
    except Exception as e:
        return f'Error fetching Service details: {e}'


@service_bp.route('/service/<service_id>/edit', methods=['PUT'])
def edit_service(service_id):
    try:
        data = request.json
        service_dict = {}

        for k, v in data.items():
            service_dict[k] = v

        search_criteria = {'service_id': data.get('service_id')}
        res = mongo.db.service_collection.update_one(search_criteria, {"$set": data})
        if res.matched_count > 0:
            return jsonify(service_dict), 200
        else:
            return jsonify({'error': 'Service not found or no changes made'}), 404
    except Exception as e:
        return f'Error: {e}'


@service_bp.route('/service/<service_id>/delete', methods=['DELETE'])
def delete_service(service_id):
    try:
        service_dict = {"service_id": service_id}
        service_to_delete = mongo.db.service_collection.find_one(service_dict)

        if service_to_delete is not None:
            res = mongo.db.service_collection.delete_one(service_dict)

            if res.deleted_count > 0:
                return jsonify(convert_document(service_to_delete)), 200
        else:
            return jsonify({'error': 'Service not found or no changes made'}), 404
    except Exception as e:
        return f'Error: {e}'