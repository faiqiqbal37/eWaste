import os.path
import pathlib

import cachecontrol
import google.auth.transport.requests
from flask import jsonify, request, url_for, session, redirect, abort
from google.oauth2 import id_token

from . import backend_session_bp
from .. import mongo
from flask_pymongo import ObjectId
from bson import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
import requests
import uuid
from google_auth_oauthlib.flow import Flow

os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

current_file_path = os.path.abspath(__file__)
current_directory_path = os.path.dirname(current_file_path)
parent_directory_path = os.path.dirname(current_directory_path)

specific_path = "client_secrets.json"
new_path = os.path.join(parent_directory_path, specific_path)

GOOGLE_CLIENT_ID = "268743994967-kpge79llg0la51nqpv3490i89hm8i356.apps.googleusercontent.com"

flow = Flow.from_client_secrets_file(
    client_secrets_file=new_path,
    scopes=["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email",
            "openid", ],
    redirect_uri="http://127.0.0.1:5000/api/session/login/callback"
)


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
                print(new_usr)
                return jsonify(new_usr), 200
            else:
                return jsonify({"role": "incorrect"}), 200

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

        response = requests.post(baseUrl + url, json=validation_dict)

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

        response = requests.post(baseUrl + url, json=validation_dict)

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


def convert_document(document):
    """Convert ObjectId to string for JSON serialization."""
    for key, value in document.items():
        if isinstance(value, ObjectId):
            document[key] = str(value)
    return document


@backend_session_bp.route('/session/thirdlogin', methods=['GET'])
def third_login():
    authorization_url, state = flow.authorization_url()
    session["state"] = state
    print(authorization_url)
    return jsonify({"url": authorization_url}), 200


@backend_session_bp.route('/session/login/callback')
def callback():
    flow.fetch_token(authorization_response=request.url)

    credentials = flow.credentials
    request_session = requests.session()
    cached_session = cachecontrol.CacheControl(request_session)
    token_request = google.auth.transport.requests.Request(session=cached_session)

    id_info = id_token.verify_oauth2_token(
        id_token=credentials._id_token,
        request=token_request,
        audience=GOOGLE_CLIENT_ID
    )

    third_party_email = id_info['email']
    third_party_name = id_info['given_name']
    third_party_contact = id_info['exp']

    user_dict = {"email": third_party_email}
    res = mongo.db.user_collection.find_one(user_dict)

    # if the third party account is not in the db, create a new one
    if res is None:

        account_dict = {'contact': str(third_party_contact),
                        'email': third_party_email,
                        'name': third_party_name,
                        'password': generate_password_hash('pytest123456'),
                        'role': 'customer',
                        'user_id': third_party_email}

        res = mongo.db.user_collection.insert_one(account_dict)
        res = mongo.db.user_collection.find_one(account_dict)
        res = convert_document(res)
        session['current_user'] = res

    else:
        res = convert_document(res)
        session['current_user'] = res

    return redirect(f"http://localhost:3000/googlesuccess/{res['email']}")
