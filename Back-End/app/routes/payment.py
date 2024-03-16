from . import payment_bp
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


@payment_bp.route('/payments', methods=['GET'])
def payments():
    try:
        cursor = mongo.db.payment_collection.find()
        data = [convert_document(document) for document in cursor]
        if data:
            return jsonify(data), 200
    except Exception as e:
        return f'Error fetching payments: {e}'


@payment_bp.route('/payments/new', methods=['POST'])
def create_payment():
    try:
        data = request.json
        payment_dict = {}
        for k, v in data.items():
            payment_dict[k] = v
        
        res = mongo.db.payment_collection.insert_one(payment_dict)
        res = mongo.db.payment_collection.find_one(payment_dict)
        res = convert_document(res)
        return jsonify(res), 200
    except Exception as e:
        return f'Error creating payment: {e}'

@payment_bp.route('/payments/<payment_id>', methods=['GET'])
def get_payment_details(payment_id):
    try:
        paymentid_dict = {"payment_id": payment_id}
        res = mongo.db.payment_collection.find_one(paymentid_dict)

        if res != None:
            return jsonify(convert_document(res)), 200
        else:
            return jsonify({'error': 'Payment not found'}), 404
    except Exception as e:
        return f'Error fetching payment details: {e}'

@payment_bp.route('/payments/<payment_id>/edit', methods=['PUT'])
def edit_payment(payment_id):
    try:
        data = request.json
        payment_dict = {}
        for k,v in data.items():
            payment_dict[k] = v

        search_criteria = {'payment_id': data.get('payment_id')}
        res = mongo.db.payment_collection.update_one(search_criteria, {"$set": data})

        if res.matched_count > 0:
            return jsonify(payment_dict), 200
        else:
            return jsonify({'error': 'Payment not found or no changes made'}), 404
    except Exception as e:
        return f'Error: {e}'

@payment_bp.route('/payments/<payment_id>/delete', methods=['DELETE'])
def delete_payment(payment_id):
    try:
        payment_dict = {"payment_id": payment_id}
        payment_to_delete = mongo.db.payment_collection.find_one(payment_dict)

        if payment_to_delete != None:
            res = mongo.db.payment_collection.delete_one(payment_dict)

            if res.deleted_count > 0:
                return jsonify(convert_document(payment_to_delete)), 200
            else:
                return jsonify({'error': 'Payment not found or no changes made'}), 404
        else:
            return jsonify({'error': 'Payment not found or no changes made'}), 404
    except Exception as e:
        return f'Error: {e}'