import json
import pytest

from flask import Flask
from ..routes import stripe_bp

app = Flask(__name__)
app.register_blueprint(stripe_bp, url_prefix='/api')


@pytest.fixture
def client():
    """Create a test client for the Flask app."""
    with app.test_client() as client:
        yield client


def test_get_order_amount(client):
    response = client.get('/api/service_cost')
    assert response.status_code == 200
    assert response.json == 1400


def test_webhook(client):
    payload = {"type": "payment_intent.succeeded", "data": {"object": {"amount": 1000}}}
    response = client.post('/api/stripe/stripe-webhook', json=payload)
    assert response.status_code == 200


def test_create_checkout_session(client):
    service_name = "test_service"
    order_id = "123456"
    response = client.post(f'/api/stripe/service/{service_name}/{order_id}/create-checkout-session')
    assert response.status_code == 303
