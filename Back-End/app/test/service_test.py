import json
import pytest

from flask import Flask
from ..routes import service_bp

app = Flask(__name__)
app.register_blueprint(service_bp, url_prefix='/api')


@pytest.fixture
def client():
    """Create a test client for the Flask app."""
    with app.test_client() as client:
        yield client


def test_get_service(client):
    """Test the GET /service endpoint."""
    # Make a GET request to retrieve all services
    response = client.get('api/service')

    # Check if the response status code is 200 OK
    assert response.status_code == 200

    # Check if the response data is a JSON list
    data = json.loads(response.data)
    assert isinstance(data, list)


def test_create_service(client):
    """Test the POST /service/new endpoint."""
    # Prepare data for creating a new service
    new_service_data = {'service_id': 'pytest', 'service_name': 'Test Service', "data_link": ["Test link"]}

    # Make a POST request to create a new service
    response = client.post('api/service/new', json=new_service_data)

    # Check if the response status code is 200 OK
    assert response.status_code == 200

    # Check if the response data contains the newly created service details
    data = json.loads(response.data)
    assert 'service_id' in data
    assert 'service_name' in data
    assert 'data_link' in data
    assert data['service_id'] == 'pytest'


def test_get_service_details(client):
    """Test the GET /service/<service_id> endpoint."""

    # Make a GET request to retrieve details of a specific service
    response = client.get('api/service/pytest')

    # Check if the response status code is 200 OK
    assert response.status_code == 200

    # Check if the response data contains the expected service details
    data = json.loads(response.data)
    assert 'service_id' in data
    assert 'service_name' in data
    assert data['service_id'] == 'pytest'


def test_get_service_details_not_found(client):
    """Test the GET /service/<service_id> endpoint 
    for the case where the service with the specified id cannot be found"""

    # Make a GET request to retrieve details of a specific service
    response = client.get('api/service/none')

    # Check if the response status code is 404 NOT FOUND
    assert response.status_code == 404


def test_edit_service(client):
    """Test the PUT /service/<service_id>/edit endpoint."""
    # Prepare data for editing a service
    service_id = 'pytest'

    # Prepare data for editing the service link
    edited_service_link = {'service_id': 'pytest', 'service_name': 'Edit Service', "data_link": ["Edit link"]}

    # Make a PUT request to edit the service link
    response = client.put(f'api/service/{service_id}/edit', json=edited_service_link)

    # Check if the response status code is 200 OK
    assert response.status_code == 200


def test_edit_service_not_found(client):
    """Test the PUT /service/<service_id>/edit endpoint for
    the case where the service to be edited cannot be found"""
    # Prepare data for editing a service
    service_id = 'none'

    # Prepare data for editing the service link
    edited_service_link = {'service_id': 'none', 'service_name': 'Edit Service', "data_link": ["Edit link"]}

    # Make a PUT request to edit the service link
    response = client.put(f'api/service/{service_id}/edit', json=edited_service_link)

    # Check if the response status code is 404 NOT FOUND
    assert response.status_code == 404


def test_delete_service(client):
    """Test the DELETE /service/<service_id>/delete endpoint."""
    # Make a DELETE request to delete a service
    response = client.delete('api/service/pytest/delete')

    # Check if the response status code is 200 OK
    assert response.status_code == 200

    # Check if the response data contains the deleted service details
    data = json.loads(response.data)
    assert 'service_id' in data
    assert 'service_name' in data
    assert data['service_id'] == 'pytest'



def test_delete_service_not_found(client):
    """Test the DELETE /service/<service_id>/delete endpoint 
    for the case where the service to be deleted cannot be found"""

    # Make a DELETE request to delete a service
    response = client.delete('api/service/none/delete')

    # Check if the response status code is 404 NOT FOUND
    assert response.status_code == 404