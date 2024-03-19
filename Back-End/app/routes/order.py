from . import order_bp
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


@order_bp.route('/orders', methods=['GET'])
def orders():
    try:
        cursor = mongo.db.order_collection.find()
        data = [convert_document(document) for document in cursor]
        if data:
            return jsonify(data), 200
    except Exception as e:
        return f'Error fetching orders: {e}'


@order_bp.route('/orders/new', methods=['POST'])
def create_order():
    try:
        data = request.json
        order_dict = {}
        for k, v in data.items():
            order_dict[k] = v

        res = mongo.db.order_collection.insert_one(order_dict)
        res = mongo.db.order_collection.find_one(order_dict)
        return jsonify(convert_document(res)), 200
    except Exception as e:
        return f'Error creating order: {e}'
    

@order_bp.route('/orders/user/<user_id>', methods=['GET'])
def orders_from_user_id(user_id):
    try:
        userid_dict = {"user_id": user_id}
        res = mongo.db.order_collection.find(userid_dict)
        data = [convert_document(document) for document in res]

        if data:
            return jsonify(data), 200
        else:
            return jsonify({}), 404

    except Exception as e:
        return f'Error fetching orders: {e}'
    

@order_bp.route('/orders/<order_id>', methods=['GET'])
def get_order_details(order_id):
    try:
        orderid_dict = {"order_id": order_id}
        res = mongo.db.order_collection.find_one(orderid_dict)

        if res != None:
            return jsonify(convert_document(res)), 200
        else:
            return jsonify({'error': 'Order not found'}), 404
    except Exception as e:
        return f'Error fetching order details: {e}'


@order_bp.route('/orders/<order_id>/edit', methods=['PUT'])
def edit_order(order_id):
    try:
        data = request.json
        order_dict = {}
        for k, v in data.items():
            order_dict[k] = v
        
        search_criteria = {'order_id': data.get('order_id')}
        res = mongo.db.order_collection.update_one(search_criteria, {"$set": data})

        if res.matched_count > 0:
            return jsonify(order_dict), 200
        else:
            return jsonify({'error': 'Order not found or no changes made'}), 404
    except Exception as e:
        return f'Error: {e}'


@order_bp.route('/orders/<order_id>/delete', methods=['DELETE'])
def delete_order(order_id):
    try:
        order_dict = {"order_id": order_id}
        order_to_delete = mongo.db.order_collection.find_one(order_dict)

        if order_to_delete != None:
            res = mongo.db.order_collection.delete_one(order_dict)

            if res.deleted_count > 0:
                return jsonify(convert_document(order_to_delete)), 200
            else:
                return jsonify({'error': 'Order not found or no changes made'}), 404
        else:
            return jsonify({'error': 'Order not found or no changes made'}), 404
    except Exception as e:
        return f'Error: {e}'
    

@order_bp.route('/orders/search', methods=['GET'])
def search_orders():
    try:
        data = request.json
        cursor = mongo.db.order_collection.find(data)
        data = [convert_document(document) for document in cursor]
        if data:
            return jsonify(data), 200
        else:
            return jsonify({'error': 'No orders matching the criteria found'}), 404

    except Exception as e:
        return f'Error: {e}'