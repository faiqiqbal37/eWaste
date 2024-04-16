from flask import jsonify, request, url_for, session
from . import backend_session_bp
from .. import mongo
from flask_pymongo import ObjectId
from bson import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
import requests
import uuid


@backend_session_bp.route('/session/current', methods=['GET'])
def get_current_user():
    # Retrieve user data from session
    current_user = session.get('current_user')
    if current_user:
        return jsonify(current_user), 200
    else:
        return jsonify({"message": "No user logged in"}), 200


@backend_session_bp.route('/session/login', methods=['POST'])
def login():
    try:
        data = request.json
        user_dict = {}

        for k, v in data.items():
            user_dict[k] = v

        baseUrl = "http://127.0.0.1:5000"
        url = url_for("user.get_user_details_from_email", email=user_dict['email'])

        response = requests.get(baseUrl + url)
        res = response.json()

        if not res:
            return jsonify({}), 200
        
        else:
            new_usr = {}
            for k, v in res.items():
                new_usr[k] = v

            if check_password_hash(new_usr['password'], user_dict['password']):
                # Store user data in session
                new_usr.pop("_id")
                session['current_user'] = new_usr
                return jsonify(new_usr), 200
            else:
                return jsonify({}), 200

    except Exception as e:
        return f'Error fetching data: {e}'


@backend_session_bp.route('/session/logout', methods=['GET'])
def logout():
    # Clear user data from session
    logged_out_usr = session.pop('current_user', None)
    return jsonify(logged_out_usr), 200


@backend_session_bp.route('/session/register', methods=['POST'])
def register():
    try:
        data = request.json
        user_dict = {}

        for k, v in data.items():
            user_dict[k] = v
        user_dict['user_id'] = str(uuid.uuid4())
        user_dict['role'] = "customer"
        user_dict['password'] = generate_password_hash(user_dict['password'])

        baseUrl = "http://127.0.0.1:5000"
        url = url_for("user.find_user_from_unique_attribute")


        validation_dict = {'email': user_dict['email'],
                           'contact': user_dict['contact']}

        response = requests.post(baseUrl+url, json=validation_dict)

        res = response.json()

        if res:
            return jsonify({}), 200

        url = url_for("user.create_user")

        response = requests.post(baseUrl + url, json=user_dict)
        res = response.json()

        for k, v in res.items():
            user_dict[k] = v

        return jsonify(user_dict), 200

    except Exception as e:
        return f"Error: {e}"


@backend_session_bp.route('/session/register/admin', methods=['POST'])
def register_admin():
    try:
        data = request.json
        user_dict = {}

        for k, v in data.items():
            user_dict[k] = v
        user_dict['user_id'] = str(uuid.uuid4())
        user_dict['role'] = "admin"
        user_dict['password'] = generate_password_hash(user_dict['password'])

        baseUrl = "http://127.0.0.1:5000"
        url = url_for("user.find_user_from_unique_attribute")


        validation_dict = {'email': user_dict['email'],
                           'contact': user_dict['contact']}

        response = requests.post(baseUrl+url, json=validation_dict)

        res = response.json()

        if res:
            return jsonify({}), 200

        url = url_for("user.create_user")

        response = requests.post(baseUrl + url, json=user_dict)
        res = response.json()

        for k, v in res.items():
            user_dict[k] = v

        return jsonify(user_dict), 200

    except Exception as e:
        return f"Error: {e}"