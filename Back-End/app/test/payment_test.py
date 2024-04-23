import json
import pytest

from flask import Flask
from ..routes import payment_bp

app = Flask(__name__)
app.register_blueprint(payment_bp, url_prefix='/api')


@pytest.fixture
def client():
    """Create a test client for the Flask app."""
    with app.test_client() as client:
        yield client


def test_get_payments(client):
    """Test the GET /payments endpoint."""
    response = client.get('api/payments')

    assert response.status_code == 200

    data = json.loads(response.data)
    assert isinstance(data, list)


def test_create_payment(client):
    """Test the POST /payments/new endpoint."""
    new_payment_data = {'payment_id': 'pytest', 'amount': 100, 'date': '2024-03-03T00:00:00Z'}

    response = client.post('api/payments/new', json=new_payment_data)

    assert response.status_code == 200

    data = json.loads(response.data)
    assert 'payment_id' in data
    assert 'amount' in data
    assert 'date' in data
    assert data['payment_id'] == 'pytest'


def test_get_payment_details(client):
    """Test the GET /payments/<payment_id> endpoint."""
    payment_id = 'pytest'

    response = client.get(f'api/payments/{payment_id}')

    assert response.status_code == 200

    data = json.loads(response.data)
    assert 'payment_id' in data
    assert 'amount' in data
    assert data['payment_id'] == 'pytest'


def test_edit_payment(client):
    """Test the PUT /payments/<payment_id>/edit endpoint."""
    payment_id = 'pytest'
    edited_payment_data = {'payment_id': 'pytest', 'amount': 150, "currency": "EUR"}

    response = client.put(f'api/payments/{payment_id}/edit', json=edited_payment_data)

    assert response.status_code == 200


def test_delete_payment(client):
    """Test the DELETE /payments/<payment_id>/delete endpoint."""
    payment_id = 'pytest'

    response = client.delete(f'api/payments/{payment_id}/delete')

    assert response.status_code == 200

    data = json.loads(response.data)
    assert 'payment_id' in data
    assert 'amount' in data
    assert data['payment_id'] == 'pytest'
