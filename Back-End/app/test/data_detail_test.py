import json
import pytest

from flask import Flask
from ..routes import data_detail_bp

app = Flask(__name__)
app.register_blueprint(data_detail_bp, url_prefix='/api')


@pytest.fixture
def client():
    """Create a test client for the Flask app."""
    with app.test_client() as client:
        yield client


def test_create_data_detail(client):
    """Test the POST /data_detail/new endpoint."""

    # Prepare data for creating a new data detail entry
    new_data_detail = {
        'data_detail_id': 'pytest',
    }

    # Make a POST request to create a new data detail entry
    response = client.post('api/data_detail/new', json=new_data_detail)

    # Check if the response status code is 200 OK
    assert response.status_code == 200

    # Check if the response data contains the newly created data detail entry
    data = json.loads(response.data)
    assert 'data_detail_id' in data
    assert 'data_link' in data
    assert data['data_detail_id'] == 'pytest'


def test_data_detail(client):
    """Test the GET /data_detail endpoint."""

    # Make a GET request to retrieve all data detail entries
    response = client.get('api/data_detail')

    # Check if the response status code is 200 OK
    assert response.status_code == 200

    # Check if the response data is a JSON list
    data = json.loads(response.data)
    assert isinstance(data, list)


def test_get_data_detail(client):
    """Test the GET /data_detail/<data_id> endpoint."""

    # Make a GET request to retrieve details of a specific data detail entry
    response = client.get('api/data_detail/pytest')

    # Check if the response status code is 200 OK
    assert response.status_code == 200

    # Check if the response data contains the expected data detail entry
    data = json.loads(response.data)
    assert 'data_detail_id' in data
    assert 'data_link' in data
    assert data['data_detail_id'] == 'pytest'


def test_get_data_detail_not_found(client):
    """Test the GET /data_detail/<data_id> endpoint 
    for the case where the data with the specified id cannot be found"""

    # Make a GET request to retrieve details of a specific data detail entry
    response = client.get('api/data_detail/none')

    # Check if the response status code is 404 NOT FOUND
    assert response.status_code == 404


def test_edit_data_detail(client):
    """Test the PUT /data_detail/<data_id>/edit endpoint."""

    # Prepare data for editing a data detail entry
    data_detail_id = 'pytest'

    # Prepare data for editing the data detail entry
    edited_data_detail = {
          'data_detail_id' : 'pytest',
          'data_link': 'edited_test_link'
    }

    # Make a PUT request to edit the data detail entry
    response = client.put(f'api/data_detail/{data_detail_id}/edit', json=edited_data_detail)

    # Check if the response status code is 200 OK
    assert response.status_code == 200


def test_edit_data_detail_not_found(client):
    """Test the PUT /data_detail/<data_id>/edit endpoint for 
    the case where  the data to be edited cannot be found"""

    # Prepare data for editing a data detail entry
    data_detail_id = 'none'

    # Prepare data for editing the data detail entry
    edited_data_detail = {
          'data_detail_id' : 'none',
          'data_link': 'edited_test_link'
    }

    # Make a PUT request to edit the data detail entry
    response = client.put(f'api/data_detail/{data_detail_id}/edit', json=edited_data_detail)

    # Check if the response status code is 404 NOT FOUND
    assert response.status_code == 404


def test_delete_data_detail(client):
    """Test the DELETE /data_detail/<data_id>/delete endpoint."""

    # Make a DELETE request to delete a data detail entry
    response = client.delete('api/data_detail/pytest/delete')

    # Check if the response status code is 200 OK
    assert response.status_code == 200

    # Check if the response data contains the deleted data detail entry information
    data = json.loads(response.data)
    assert 'data_detail_id' in data
    assert 'data_link' in data
    assert data['data_detail_id'] == 'pytest'


def test_delete_data_detail_not_found(client):
    """Test the DELETE /data_detail/<data_id>/delete endpoint
    for the case where the data to be deleted cannot be found"""

    # Make a DELETE request to delete a data detail entry
    response = client.delete('api/data_detail/none/delete')

    # Check if the response status code is 404 NOT FOUND
    assert response.status_code == 404
