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


def test_qr_code(client):
    # Make a GET request to retrieve the QR code details
    response = client.get(f'/api/qr_code')

    # Check if the response status code is 200 OK
    assert response.status_code == 200


def test_get_qr_code_details(client):
    """Test the GET /qr_code/<qr_id> endpoint."""
    # Assume there is a QR code with qr_id '123' in the database
    qr_id = 'qrid1'
    expected_response = {'_id': "6611cd06dc818ca307f298fd",
                         'qr_id': qr_id,
                         'qr_link': 'iVBORw0KGgoAAAANSUhEUgAAAUoAAAFKAQAAAABTUiuoAAAB8ElEQVR4nO2bQYrjMBBFX40CWcowB8hR7JuFuZl1lD5Ag70MyPxZyEqcnk0ScFpDlxYhVt7ig6nvXyXHxIMr/XqUBEcdddRRRx3dE7V1HSCZGakDG+a6PewuwNFn0F6SNAG9MnaeAAiSJN2j+whw9Bl0riWU7IDG+YBGoNTbOwQ4+gJq5wnMuqX637sFOPocGkQ/hX/7sBa1/jC0+lwUMINSFyCdMmKG7T37dq2Oss0R17JaP+p2L0njt2t1tNTWrYSUTheDeLG13vYW4OgLtRUljVCSYLm8/SCvrbbQ2Qyiria4GKlbDFi8O24GvXZTIVv/YUDMkLpPDI6C2futdtA7J9zUVpA0hbLnTtgKijardlnlWz+Bxpg9EzaG2jAfsCFmpAlsYFkfY9QZVDNafzK6OuHG+ghlvquRoPIY89pqDI0ZG2IuFzZQPXH0lNEQWu/F/DuTLGSIn6Z0yhgsBoRsewpw9NWUUdJhZg2GxSIr4k7YCro5OwbKVLe2WkE27C7A0WfQ29lxGe1+mK198im/RYCjD62aCaEGw9pl3SPuhK2idr72yWPM2PBuAY4+jAbpjx0ogyjmo79F0wz69ezYiBdTr8VYh7zTvgIcfR5NZmbWwXpiPB9Lll+HTvsLcPSRZf6vBUcdddRRR/8j9C+hyzvxrmH8ywAAAABJRU5ErkJggg=='}  # Change this accordingly

    # Make a GET request to retrieve the QR code details
    response = client.get(f'/api/qr_code/{qr_id}')

    # Check if the response status code is 200 OK
    assert response.status_code == 200

    # Check if the response data matches the expected response
    assert json.loads(response.data) == expected_response


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


def test_edit_qr_code(client):
    """Test the PUT /qr_code/<qr_id>/edit endpoint."""
    # Assume there is a QR code with qr_id '456' in the database
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
    # Assume there is a QR code with qr_id '789' in the database
    qr_id = 'pytest'

    # Make a DELETE request to delete the QR code
    response = client.delete(f'api/qr_code/{qr_id}/delete')

    # Check if the response status code is 200 OK
    assert response.status_code == 200

    # Check if the response data contains the deleted QR code details
    assert 'qr_id' in json.loads(response.data)
    assert 'qr_link' in json.loads(response.data)
