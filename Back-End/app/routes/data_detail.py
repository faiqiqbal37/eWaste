from . import data_detail_bp
from flask import jsonify, request
from .. import mongo
from flask_pymongo import ObjectId
from bson import ObjectId
from datetime import datetime

def convert_document(document):
    """Convert ObjectId to string for JSON serialization."""
    for key, value in document.items():
        if isinstance(value, ObjectId):
            document[key] = str(value)
    return document

@data_detail_bp.route('/data_detail', methods=['GET'])
def data_detail():
    try:
        cursor = mongo.db.data_detail_collection.find()
        data = [convert_document(document) for document in cursor]
        if data:
            return jsonify(data), 200
    except Exception as e:
        return f'Error fetching data links: {e}'

@data_detail_bp.route('/data_detail/new', methods=['POST'])
def create_data_detail():
    # TODO
    pass

@data_detail_bp.route('/data_detail/<data_id>', methods=['GET'])
def get_data_detail(data_id):
    try:
        dataid_dict = {"data_detail_id": data_id}
        res = mongo.db.data_detail_collection.find_one(dataid_dict)

        if res != None:
            return jsonify(convert_document(res)), 200
    except Exception as e:
        return f'Error fetching data link: {e}'

@data_detail_bp.route('/data_detail/<data_id>/edit', methods=['PUT'])
def edit_data_detail(data_id):
    try:
        data = request.json
        data_detail_dict = {}
        for k, v in data.items():
            data_detail_dict[k] = v

        search_criteria = {'data_detail_id': data.get('data_detail_id')}
        res = mongo.db.data_detail_collection.update_one(search_criteria, {"$set": data})

        if res.matched_count > 0:
            return jsonify(data_detail_dict), 200
        else:
            return jsonify({'error': 'Data link not found or no changes made'}), 404
    except Exception as e:
        return f'Error: {e}'

@data_detail_bp.route('/data_detail/<data_id>/delete', methods=['DELETE'])
def delete_data_detail(data_id):
    try:
        data_detail_dict = {"data_detail_id": data_id}
        data_detail_to_delete = mongo.db.data_detail_collection.find_one(data_detail_dict)

        if data_detail_to_delete != None:
            res = mongo.db.data_detail_collection.delete_one(data_detail_dict)

            if res.deleted_count > 0:
                return jsonify(convert_document(data_detail_to_delete)), 200
            else:
                return jsonify({'error': 'Data link not found or no changes made'}), 404
        else:
            return jsonify({'error': 'Data link not found or no changes made'}), 404
    except Exception as e:
        return f'Error: {e}'
