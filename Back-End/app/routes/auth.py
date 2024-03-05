from pymongo import MongoClient
from . import auth_bp
from flask import jsonify, request, session
from ..config import Config


def check_user(user_id, password):
    # Establish connection
    client = MongoClient(Config.MONGO_URI)

    # Select or create a database
    db = client['mydatabase']

    # Select or create a collection (table)
    collection = db['user_collection']

    # Query documents that simultaneously contain the username and password fields
    result = collection.find({
        '$and': [
            {'user_id': user_id},
            {'password': password}
        ]
    })

    client.close()

    return result.count() > 0


@auth_bp.route('/login', methods=['POST', 'GET'])
def login():
    data = request.json  # Assume the frontend submits the email and password in JSON format
    email = data.get('email')
    password = data.get('password')

    # Check for the user
    if_successful = check_user(email, password)
    print(if_successful)
    if if_successful:
        # Login successful, set the session
        # session['user'] = user_id
        return jsonify({'status': 'success', 'message': 'Login successful'}), 200
    else:
        # Invalid credentials, return an error response
        return jsonify({'status': 'error', 'message': 'Invalid credentials'}), 401


@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json  # Assume the frontend submits the username and password in JSON format
    user_id = data.get('user_id')
    password = data.get('password')
    role = data.get('role')
    name = data.get('name')
    email = data.get('email')

    # Build the user data to be inserted
    user_data = {
        'user_id': user_id,
        'password': password,
        'role': role,
        'name': name,
        'email': email
    }

    if_exist = check_user(user_id, password)
    if if_exist:
        return jsonify({'status': 'error', 'message':'User already exists'})

    # Establish connection
    client = MongoClient(Config.MONGO_URI)

    # Select or create a database
    db = client['mydatabase']

    # Select or create a collection (table)
    collection = db['user_collection']

    # Insert data into the user collection
    insert_result = collection.insert_one(user_data)

    # Check if the insertion was successful
    if insert_result.inserted_id:
        return jsonify({'status': 'success', 'message': 'User registered successfully'}), 200
    else:
        return jsonify({'status': 'error', 'message': 'Failed to register user'}), 500

