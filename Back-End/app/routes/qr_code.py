from bson import ObjectId
from . import qr_code_bp
from .. import mongo
from flask import jsonify, request


def convert_document(document):
    """Convert ObjectId to string for JSON serialization."""
    for key, value in document.items():
        if isinstance(value, ObjectId):
            document[key] = str(value)
    return document


@qr_code_bp.route('/qr_code', methods=['GET'])
def qr_code():
    try:
        cursor = mongo.db.qr_collection.find()
        data = [convert_document(document) for document in cursor]
        if data:
            return jsonify(data), 200
    except Exception as e:
        return f'Error fetching qr_code: {e}'


@qr_code_bp.route('/qr_code/new', methods=['POST'])
def create_qr_code():
    try:
        data = request.json
        qr_code_dict = {}
        for k, v in data.items():
            qr_code_dict[k] = v

        res = mongo.db.qr_collection.insert_one(qr_code_dict)
        res = mongo.db.qr_collection.find_one(qr_code_dict)
        res = convert_document(res)
        return jsonify(res), 200
    except Exception as e:
        return f'Error creating qr_code: {e}'


@qr_code_bp.route('/qr_code/<qr_id>', methods=['GET'])
def get_qr_code_details(qr_id):
    try:
        qr_code_dict = {"qr_id": qr_id}
        res = mongo.db.qr_collection.find_one(qr_code_dict)

        if res is not None:
            return jsonify(convert_document(res)), 200
        else:
            return jsonify({'error': 'Qr code not found'}), 404
    except Exception as e:
        return f'Error fetching qr code details: {e}'


@qr_code_bp.route('/qr_code/<qr_id>/edit', methods=['PUT'])
def edit_qr_code(qr_id):
    try:
        data = request.json
        qr_code_dict = {}

        for k, v in data.items():
            qr_code_dict[k] = v

        search_criteria = {'qr_id': data.get('qr_id')}
        res = mongo.db.qr_collection.update_one(search_criteria, {"$set": data})
        if res.matched_count > 0:
            return jsonify(qr_code_dict), 200
        else:
            return jsonify({'error': 'Qr code not found or no changes made'}), 404
    except Exception as e:
        return f'Error: {e}'


@qr_code_bp.route('/qr_code/<qr_id>/delete', methods=['DELETE'])
def delete_qr_code(qr_id):
    try:
        qr_code_dict = {"qr_id": qr_id}
        qr_code_to_delete = mongo.db.qr_collection.find_one(qr_code_dict)

        if qr_code_to_delete is not None:
            res = mongo.db.qr_collection.delete_one(qr_code_dict)

            if res.deleted_count > 0:
                return jsonify(convert_document(qr_code_to_delete)), 200
            else:
                return jsonify({'error': 'Qr code not found or no changes made'}), 404
        else:
            return jsonify({'error': 'Qr code not found or no changes made'}), 404
    except Exception as e:
        return f'Error: {e}'