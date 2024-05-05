import json
import pytest

from flask import Flask
from ..routes import device_bp

app = Flask(__name__)
app.register_blueprint(device_bp, url_prefix='/api')

@pytest.fixture
def client():
    """Create a test client for the Flask app."""
    with app.test_client() as client:
        yield client

def test_create_device(client):
    """Test the POST /devices/new endpoint"""

    # Prepare data for creating new device
    new_device_data = {
        'device_id': 'pytest',
        'device_name': 'test_name',
        'device_type': 'test_type',
        'photos': ['test_image.jpg'],
        'price': 99,
        'classification': 'test_classification',
        'flag': False
    }

    # Make a POST request to create a new device
    response = client.post('/api/devices/new', json=new_device_data)

    # Check if response status code is 200 OK
    assert response.status_code == 200

    # Check if response data contains newly created device details
    data = json.loads(response.data)
    assert 'device_id' in data
    assert 'device_name' in data
    assert 'device_type' in data
    assert 'photos' in data
    assert 'price' in data
    assert 'classification' in data
    assert 'flag' in data
    assert data['device_id'] == 'pytest'


def test_get_devices(client):
    """Test the GET /devices endpoint"""

    # Make a GET request to retrieve all devices
    response = client.get('api/devices')

    # Check if the respond status code is 200 OK
    assert response.status_code == 200

    # Check if response data is a JSON list
    data = json.loads(response.data)
    assert isinstance(data, list)


def test_get_device_details(client):
    """Test the GET /devices/<device_id> endpoint"""

    # Make a GET request to retrieve the details of a specific device
    response = client.get('api/devices/pytest')

    # Check if the response status code is 200 OK
    assert response.status_code == 200

    # Check if the response data contains the expected device details
    data = json.loads(response.data)
    assert 'device_id' in data
    assert 'device_name' in data
    assert 'device_type' in data
    assert 'photos' in data
    assert 'price' in data
    assert 'classification' in data
    assert 'flag' in data
    assert data['device_id'] == 'pytest'


def test_get_device_details_not_found(client):
    """Test the GET /devices/<device_id> endpoint
    for the case where no device with the given id can be found"""

    # Make a GET request to retrieve the details of a specific device
    response = client.get('api/devices/none')

    # Check if the response status code is 404 NOT FOUND
    assert response.status_code == 404


def test_edit_device(client):
    """Test the PUT /devices/<device_id>/edit"""

    # Prepare data for editing an device
    device_id = 'pytest'
    edited_device = {
        'device_id': 'pytest',
        'classification': 'edited_test_classification',
        'device_name': 'edited_test_name',
    }

    # Make a PUT request to edit the device
    response = client.put(f'api/devices/{device_id}/edit', json=edited_device)

    # Check if the response status code is 200 OK
    assert response.status_code == 200


def test_delete_device(client):
    """Test the GET /devices/<device_id>/delete endpoint"""

    # Make a DELETE request to delete a device
    response = client.get('api/devices/pytest/delete')

    # Check if the response status code is 200 OK
    assert response.status_code == 200

    # Check if the response data contains the deleted device details
    data = json.loads(response.data)
    assert 'device_id' in data
    assert 'device_name' in data
    assert 'device_type' in data
    assert 'photos' in data
    assert 'price' in data
    assert 'classification' in data
    assert 'flag' in data
    assert data['device_id'] == 'pytest'

def test_delete_device_not_found(client):
    """Test the GET /devices/<device_id>/delete endpoint
    for the case where device to be deleted cannot be found"""

    # Make a DELETE request to delete a device
    response = client.get('api/devices/none/delete')

    # Check if the response status code is 404 NOT FOUND
    assert response.status_code == 404
