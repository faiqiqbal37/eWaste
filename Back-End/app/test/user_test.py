import json
import pytest

from flask import Flask
from ..routes import user_bp

app = Flask(__name__)
app.register_blueprint(user_bp, url_prefix='/api')


@pytest.fixture
def client():
    """Create a test client for the Flask app."""
    with app.test_client() as client:
        yield client


def test_get_all_users(client):
    """Test the GET /users endpoint."""
    response = client.get('/api/users')
    assert response.status_code == 200 or response.status_code == 404


def test_get_customers(client):
    """Test the GET /users/customers endpoint."""
    response = client.get('/api/users/customers')
    assert response.status_code == 200


def test_get_staff(client):
    """Test the GET /users/staff endpoint."""
    response = client.get('/api/users/staff')
    assert response.status_code == 200 or response.status_code == 404


def test_get_admins(client):
    """Test the GET /users/admins endpoint."""
    response = client.get('/api/users/admins')
    assert response.status_code == 200 or response.status_code == 404


def test_create_user(client):
    """Test the POST /users/new endpoint."""
    new_user_data = {'user_id': 'pytest', 'name': 'John Test', 'email': 'pytest@mail.com',
                     'contact': '44-123456789', 'password': '1234', 'role':'customer'}
    response = client.post('/api/users/new', json=new_user_data)
    assert response.status_code == 200


def test_get_user_details(client):
    """Test the GET /users/<user_id> endpoint."""
    user_id = '123'
    response = client.get(f'/api/users/{user_id}')
    assert response.status_code == 200 or response.status_code == 404


def test_edit_user(client):
    """Test the PUT /users/<user_id>/edit endpoint."""
    user_id = '123'
    updated_data = {'name': 'Jane Doe'}
    response = client.put(f'/api/users/{user_id}/edit', json=updated_data)
    assert response.status_code == 200 or response.status_code == 404


def test_delete_user(client):
    """Test the GET /users/<user_id>/delete endpoint."""
    user_id = '123'
    response = client.get(f'/api/users/{user_id}/delete')
    assert response.status_code == 200 or response.status_code == 404


def test_get_user_devices(client):
    """Test the GET /users/<user_id>/devices endpoint."""
    user_id = '123'
    response = client.get(f'/api/users/{user_id}/devices')
    assert response.status_code == 200 or response.status_code == 404


def test_get_user_orders(client):
    """Test the GET /users/<user_id>/orders endpoint."""
    user_id = '123'
    response = client.get(f'/api/users/{user_id}/orders')
    assert response.status_code == 200 or response.status_code == 404


def test_scraper_cex(client):
    """Test the GET /scraper/cex/<device_name> endpoint."""
    device_name = 'iPhone'
    response = client.get(f'/api/scraper/cex/{device_name}')
    assert response.status_code == 200 or response.status_code == 404


def test_find_user_from_unique_attribute(client):
    """Test the POST /users/find endpoint."""
    unique_attribute_data = {'name': 'John Doe'}
    response = client.post('/api/users/find', json=unique_attribute_data)
    assert response.status_code == 200 or response.status_code == 404


def test_send_mail_to_user(client):
    """Test the POST /users/<user_id>/mail endpoint."""
    user_id = '123'
    mail_data = {'subject': 'Test Email', 'body': 'This is a test email.'}
    response = client.post(f'/api/users/{user_id}/mail', json=mail_data)
    assert response.status_code == 200 or response.status_code == 404
