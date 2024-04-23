import json
import pytest

from flask import Flask
from ..routes import qr_code_bp

app = Flask(__name__)
app.register_blueprint(qr_code_bp, url_prefix='/api')


@pytest.fixture
def client():
    """Create a test client for the Flask app."""
    with app.test_client() as client:
        yield client


def test_create_qr_code(client):
    """Test the POST /qr_code/new endpoint."""
    # Prepare data for creating a new QR code
    new_qr_code_data = {'qr_id': 'pytest', 'other_data': 'value'}

    # Make a POST request to create a new QR code
    response = client.post('api/qr_code/new', json=new_qr_code_data)

    # Check if the response status code is 200 OK
    assert response.status_code == 200

    # Check if the response data contains the newly created QR code details
    assert 'qr_id' in json.loads(response.data)
    assert 'qr_link' in json.loads(response.data)


def test_qr_code(client):
    # Make a GET request to retrieve the QR code details
    response = client.get(f'/api/qr_code')

    # Check if the response status code is 200 OK
    assert response.status_code == 200


def test_get_qr_code_details(client):
    """Test the GET /qr_code/<qr_id> endpoint."""
    # Assume there is a QR code with qr_id '123' in the database
    qr_id = 'pytest'

    response = client.get(f'/api/qr_code/{qr_id}')

    # Check if the response status code is 200 OK
    assert response.status_code == 200

    # Check if the response data contains the expected service details
    data = json.loads(response.data)
    assert 'qr_id' in data
    assert 'qr_link' in data
    assert data['qr_id'] == 'pytest'


def test_edit_qr_code(client):
    """Test the PUT /qr_code/<qr_id>/edit endpoint."""
    # Assume there is a QR code with qr_id 'pytest' in the database
    qr_id = 'pytest'

    # Prepare data for editing the QR code
    edited_qr_code_data = {'qr_id': qr_id, 'other_data': 'new_value'}

    # Make a PUT request to edit the QR code
    response = client.put(f'api/qr_code/{qr_id}/edit', json=edited_qr_code_data)

    # Check if the response status code is 200 OK
    assert response.status_code == 200

    # Check if the response indicates a successful update
    assert json.loads(response.data) == 'Update successful'


def test_delete_qr_code(client):
    """Test the DELETE /qr_code/<qr_id>/delete endpoint."""
    # Assume there is a QR code with qr_id 'pytest' in the database
    qr_id = 'pytest'

    # Make a DELETE request to delete the QR code
    response = client.delete(f'api/qr_code/{qr_id}/delete')

    # Check if the response status code is 200 OK
    assert response.status_code == 200

    # Check if the response data contains the deleted QR code details
    assert 'qr_id' in json.loads(response.data)
    assert 'qr_link' in json.loads(response.data)
