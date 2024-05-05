import json
import pytest

from flask import Flask
from ..routes import order_bp

app = Flask(__name__)
app.register_blueprint(order_bp, url_prefix='/api')


@pytest.fixture
def client():
    """Create a test client for the Flask app."""
    with app.test_client() as client:
        yield client


def test_get_orders(client):
    """Test the GET /orders endpoint"""

    # Make a GET request to retrieve all orders
    response = client.get('api/orders')

    # Check if the respond status code is 200 OK
    assert response.status_code == 200

    # Check if response data is a JSON list
    data = json.loads(response.data)
    assert isinstance(data, list)


def test_create_order(client):
    """Test the POST /orders/new endpoint"""

    # Prepare data for creating new order
    new_order_data = {
        'order_id': 'pytest',
        'user_id': 'pytest',
        'device_id': 'pytest',
        'date': 'test_date',
        'payment_id': 'pytest',
        'qr_id': 'pytest',
        'visibility': False,
        'status': 'test-status',
        'data_detail_id': 'pytest',
        'service_id': 'pytest'
    }

    # Make a POST request to create a new order
    response = client.post('/api/orders/new', json=new_order_data)

    # Check if response status code is 200 OK
    assert response.status_code == 200

    # Check if response data contains newly created order details
    data = json.loads(response.data)
    assert 'order_id' in data
    assert 'user_id' in data
    assert 'device_id' in data
    assert 'date' in data
    assert 'payment_id' in data
    assert 'qr_id' in data
    assert 'visibility' in data
    assert 'status' in data
    assert 'data_detail_id' in data
    assert 'service_id' in data
    assert data['order_id'] == 'pytest'


def test_order_from_user_id(client):
    """Test the GET /orders/user/<user_id> endpoint"""

    # Prepare data for fetching orders by user id
    user_id = 'pytest'

    # Make a GET request to retrieve the details of orders made by a specific user
    response = client.get(f'api/orders/user/{user_id}')

    # Check if the respond status code is 200 OK
    assert response.status_code == 200

    # Check if response data is a JSON list
    data = json.loads(response.data)
    assert isinstance(data, list)

def test_order_from_user_id_none_found(client):
    """Test the GET /orders/user/<user_id> endpoint
      for the case where no orders made by the specified user are found"""

    # Prepare data for fetching orders by user id
    user_id = 'none'

    # Make a GET request to retrieve the details of orders made by a specific user
    response = client.get(f'api/orders/user/{user_id}')

    # Check if the respond status code is 404 NOT FOUND
    assert response.status_code == 404


def test_get_order_details(client):
    """Test the GET /orders/<order_id> endpoint"""

    # Make a GET request to retrieve the details of a specific order
    response = client.get('api/orders/pytest')

    # Check if the response status code is 200 OK
    assert response.status_code == 200

    # Check if the response data contains the expected order details
    data = json.loads(response.data)
    assert 'order_id' in data
    assert 'user_id' in data
    assert 'device_id' in data
    assert 'date' in data
    assert 'payment_id' in data
    assert 'qr_id' in data
    assert 'visibility' in data
    assert 'status' in data
    assert 'data_detail_id' in data
    assert 'service_id' in data
    assert data['order_id'] == 'pytest'

def test_get_order_details_none_found(client):
    """Test the GET /orders/<order_id> endpoint 
    for the case where no orders with the specified id are found"""

    # Make a GET request to retrieve the details of a specific order
    response = client.get('api/orders/none')

    # Check if the response status code is 404 NOT FOUND
    assert response.status_code == 404


def test_edit_order(client):
    """Test the PUT /orders/<order_id>/edit"""

    # Prepare data for editing an order
    order_id = 'pytest'
    edited_order = {
        'order_id': 'pytest',
        'date': 'edited_test_date',
        'status': 'edited_test_status'
    }

    # Make a PUT request to edit the order
    response = client.put(f'api/orders/{order_id}/edit', json=edited_order)

    # Check if the response status code is 200 OK
    assert response.status_code == 200

def test_edit_order_none_found(client):
    """Test the PUT /orders/<order_id>/edit endpoint
    for the case where no orders with the specified id are found"""

    # Prepare data for editing an order
    order_id = 'none'
    edited_order = {
        'order_id': 'none',
        'date': 'edited_test_date',
        'status': 'edited_test_status'
    }

    # Make a PUT request to edit the order
    response = client.put(f'api/orders/{order_id}/edit', json=edited_order)

    # Check if the response status code is 404 NOT FOUND
    assert response.status_code == 404


def test_search_orders(client):
    """Test the GET /orders/search endpoint"""

    # Prepare the data for searching for orders
    search_criteria = {
        'order_id' : 'pytest'
    }

    # Make a GET request to get orders that match the criteria
    response = client.get('/api/orders/search', json=search_criteria)

    # Check if the response status code is 200 OK
    assert response.status_code == 200

    # Check if response data is a JSON list
    data = json.loads(response.data)
    assert isinstance(data, list)


def test_search_orders_none_found(client):
    """Test the GET /orders/search endpoint
    for the case where no orders matching the criteria are found"""

    # Prepare the data for searching for orders
    search_criteria = {
        'order_id' : 'none'
    }

    # Make a GET request to get orders that match the criteria
    response = client.get('/api/orders/search', json=search_criteria)

    # Check if the response status code is 404 NOT FOUND
    assert response.status_code == 404

def test_delete_order(client):
    """Test the DELETE /orders/<order_id>/delete endpoint"""

    # Make a DELETE request to delete an order
    response = client.delete('api/orders/pytest/delete')

    # Check if the response status code is 200 OK
    assert response.status_code == 200

    # Check if the response data contains the deleted order details
    data = json.loads(response.data)
    assert 'order_id' in data
    assert 'user_id' in data
    assert 'device_id' in data
    assert 'date' in data
    assert 'payment_id' in data
    assert 'qr_id' in data
    assert 'visibility' in data
    assert 'status' in data
    assert 'data_detail_id' in data
    assert 'service_id' in data
    assert data['order_id'] == 'pytest'

def test_delete_order_not_found(client):
    """Test the DELETE /orders/<order_id>/delete endpoint
    for the case where the order to be deleted cannot be found"""

    # Make a DELETE request to delete an order
    response = client.delete('api/orders/none/delete')

    # Check if the response status code is 404 NONE FOUND
    assert response.status_code == 404
