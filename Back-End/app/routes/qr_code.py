import base64
from io import BytesIO

from bson import ObjectId
from . import qr_code_bp
from .. import mongo
import qrcode
from PIL import Image
from flask import jsonify, request


def convert_document(document):
    """Convert ObjectId to string for JSON serialization."""
    for key, value in document.items():
        if isinstance(value, ObjectId):
            document[key] = str(value)
    return document


def generate_qr_code(data):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")

    return img


@qr_code_bp.route('/qr_code', methods=['GET'])
def qr_code():
    try:
        cursor = mongo.db.qr_collection.find()
        data = [convert_document(document) for document in cursor]
        if data:
            # images = []
            # for i in range(len(data)):
            #     images.append(data[i]['qr_link'])

            return jsonify(data), 200
    except Exception as e:
        return f'Error fetching qr_code: {e}'


@qr_code_bp.route('/qr_code/new', methods=['POST'])
def create_qr_code():
    try:
        data = request.json
        data_dict = {}

        for k, v in data.items():
            data_dict[k] = v

        qr_info = ""
        for k, v in data_dict.items():
            if k == "qr_id":
                continue
            qr_info += k + ": " + v + "\n"

        img = generate_qr_code(qr_info)
        buffered = BytesIO()
        img.save(buffered)
        img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")

        qr_code_dict = {'qr_id': data_dict['qr_id'], 'qr_link': img_str}
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
        data_dict = {}

        for k, v in data.items():
            data_dict[k] = v

        qr_info = ""
        for k, v in data_dict.items():
            if k == "qr_id":
                continue
            qr_info += k + ": " + v + "\n"

        img = generate_qr_code(qr_info)
        buffered = BytesIO()
        img.save(buffered)
        img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
        search_criteria = {'qr_id': data.get('qr_id')}

        res = mongo.db.qr_collection.update_one(search_criteria, {"$set": {"qr_link": img_str}})

        if res.matched_count > 0:
            return jsonify("Update successful"), 200
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
