import json
import pytest

from flask import Flask
from ..routes import staff_bp

app = Flask(__name__)
app.register_blueprint(staff_bp, url_prefix='/api')


@pytest.fixture
def client():
    """Create a test client for the Flask app."""
    with app.test_client() as client:
        yield client
    

def test_all_information(client):
    """Test the GET/POST /allInformation endpoint."""

    # Prepare data for getting the information
    request_data = {
        'user_id': 'pytest',
        'order_id': 'pytest'
    }

    # Make a GET request to get the information
    response = client.get('/api/allInformation', json=request_data)

    # Check the response status
    assert response.status_code == 200 or response.status_code == 404


def test_edit_visibility(client):
    """Test the GET/POST /editvisibility endpoint."""

    # Prepare data for editing the order visibility
    request_data = {
        'order_id': 'pytest'
    }

    # Make a POST request to edit the visibility
    response = client.post('/api/editvisibility', json=request_data)

    # Check the response status
    assert response.status_code == 200 or response.status_code == 404