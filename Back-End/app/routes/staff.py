from . import staff_bp
from flask import Flask, request, jsonify
from pymongo import MongoClient
from ..config import Config


@staff_bp.route('/test', methods=['POST', 'GET'])
def all_information():
    # Get variables passed from the frontend
    data = request.json
    user_id = data.get('user_id')
    order_id = data.get('order_id')

    # Check if variables are present
    if user_id is None or order_id is None:
        # If variables are missing, return an error message
        error_message = {'error': 'Missing one or more variables.'}
        return jsonify(error_message), 400

    # return all information of user and order

    # Establish connection
    client = MongoClient(Config.MONGO_URI)

    # Select or create a database
    db = client['mydatabase']

    # Select or user and order collection (table)
    user_collection = db['user_collection']
    order_collection = db['order_collection']
    payment_collection = db['payment_collection']
    qr_collection = db['qr_collection']
    data_detail_collection = db['data_detail_collection']
    device_collection = db['device_collection']


    # Find user and order information and based on user_id and order id
    user_information = user_collection.find_one({'user_id': user_id})
    order_information = order_collection.find_one({'order_id': order_id})

    # Check if user_id is existed
    if not user_information:
        return jsonify({'error': 'this user is not existed'}), 400

    if not order_information:
        return jsonify({'error': 'this order is not existed'}), 404

    payment_id = order_information['payment_id']
    device_id = order_information['device_id']
    qr_id = order_information['qr_id']
    data_detail_id = order_information['data_detail_id']

    payment_information = payment_collection.find_one({'payment_id': payment_id})
    device_information = device_collection.find_one({'device_id': device_id})
    qr_information = qr_collection.find_one({'qr_id': qr_id})
    data_detail_information = data_detail_collection.find_one({'data_detail_id': data_detail_id})



    return_information = {
        'Username': user_information['name'],
        'Useremail': user_information['email'],
        'device_name': device_information['device_name'],
        'device_type': device_information['device_type'],
        'device_photos':device_information['photos'],
        'device_classification': device_information['classification'],  # category
        'device_flag': device_information['flag'],  # unknown or not
        'device_price': device_information['price'],
        'payment_amount': payment_information['amount'],
        'payment_date': payment_information['date'],
        'qr_link': qr_information['qr_link'],
        'data_link': data_detail_information['data_link']
    }

    return jsonify(return_information)
