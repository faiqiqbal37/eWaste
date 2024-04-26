import json
import pytest

from flask import Flask
from ..routes import statistics_bp

app = Flask(__name__)
app.register_blueprint(statistics_bp, url_prefix='/api')



@pytest.fixture
def client():
    """Create a test client for the Flask app."""
    with app.test_client() as client:
        yield client


def test_get_total_device_type(client, requests_mock):
    """Test the GET /statistics/get_total_device_type endpoint"""

    # Mock the get request that will be made
    requests_mock.get('http://127.0.0.1:5000/api/devices',
                      json = [{'device_type': 'Mobile'}])

    # Make a GET request to get total device types
    response = client.get('/api/statistics/get_total_device_type')
    print("response: ", response)

    # Check if response data is JSON list
    data = json.loads(response.data)
    assert isinstance(data, dict)


def test_get_all_customer_statistics(client, requests_mock):
    """Test the GET /statistics/customers endpoint"""

    # Mock the get requests that will be made
    requests_mock.get('http://127.0.0.1:5000/api/users/customers',
                      json=[{'user_id': 'pytest'}])
    
    requests_mock.get('http://127.0.0.1:5000/api/orders/user/pytest',
                      json = [{
                        'order_id': 'pytest',
                        'user_id': 'pytest',
                        'device_id': 'pytest',
                        'date': '2015-02-23',
                        'payment_id': 'pytest',
                        'paymentId': 'pytest',
                        'qr_id': 'pytest',
                        'visibility': False,
                        'status': 'test-status',
                        'data_detail_id': 'pytest',
                        'service_id': 'pytest'
                      }])
    
    requests_mock.get('http://127.0.0.1:5000/api/devices/pytest',
                      json = {
                        'device_id': 'pytest',
                        'device_name': 'test_name',
                        'device_type': 'test_type',
                        'photos': ['test_image.jpg'],
                        'price': 99,
                        'classification': 'test_classification',
                        'flag': False
                      })
    
    requests_mock.get('http://127.0.0.1:5000/api/payments/pytest',
                      json = {
                        'payment_id': 'pytest',
                        'amount': 100, 
                        'date': '2024-03-03T00:00:00Z'
                      })

    

    # Make a GET request to get all customer statistics
    response = client.get('/api/statistics/customers')

    # Check if response data is JSON list
    data = json.loads(response.data)
    assert isinstance(data, list)


def test_get_customer_statistics_server(client, requests_mock):
    """Test the GET /statistics/user/<user_id> endpoint"""

    # Mock the get requests that will be made
    requests_mock.get('http://127.0.0.1:5000/api/orders/user/pytest',
                      json = [{
                        'order_id': 'pytest',
                        'user_id': 'pytest',
                        'device_id': 'pytest',
                        'date': '2015-02-23',
                        'payment_id': 'pytest',
                        'qr_id': 'pytest',
                        'visibility': False,
                        'status': 'test-status',
                        'data_detail_id': 'pytest',
                        'service_id': 'pytest'
                      }])
    
    requests_mock.get('http://127.0.0.1:5000/api/devices/pytest',
                      json = {
                        'device_id': 'pytest',
                        'device_name': 'test_name',
                        'device_type': 'test_type',
                        'photos': ['test_image.jpg'],
                        'price': 99,
                        'classification': 'test_classification',
                        'flag': False
                      })
    
    requests_mock.get('http://127.0.0.1:5000/api/payments/payment',
                      json = {
                        'payment_id': 'pytest',
                        'amount': 100, 
                        'date': '2024-03-03T00:00:00Z'
                      })
    
    
    # Make a GET request to get customer statistics
    response = client.get('/api/statistics/user/pytest')

    # Check if response data is a dictionary
    data = json.loads(response.data)
    assert isinstance(data, dict)


def test_get_total_orders_count(client, requests_mock):
    """Test the GET /statistics/total_orders_count endpoint"""

    # Mock the get requests that will be made
    requests_mock.get('http://127.0.0.1:5000/api/orders',
                    json = [{
                        'order_id': 'pytest',
                        'user_id': 'pytest',
                        'device_id': 'pytest',
                        'date': '2015-02-23',
                        'payment_id': 'pytest',
                        'qr_id': 'pytest',
                        'visibility': False,
                        'status': 'test-status',
                        'data_detail_id': 'pytest',
                        'service_id': 'pytest'
                    }])
    
    # Make a GET request to get orders count
    response = client.get('/api/statistics/total_orders_count')

    # Check if response data is a dictionary
    data = json.loads(response.data)
    assert isinstance(data, dict)


def test_get_total_orders_by_date(client, requests_mock):
    """Test the GET /statistics/total_by_date endpoint"""

    # Mock the get requests that will be made
    requests_mock.get('http://127.0.0.1:5000/api/orders',
                    json = [{
                        'order_id': 'pytest',
                        'user_id': 'pytest',
                        'device_id': 'pytest',
                        'date': '2015-02-23',
                        'payment_id': 'pytest',
                        'qr_id': 'pytest',
                        'visibility': False,
                        'status': 'test-status',
                        'data_detail_id': 'pytest',
                        'service_id': 'pytest'
                    }])
    

    # Make a GET request to get orders by date
    response = client.get('/api/statistics/total_orders_by_date')

    # Check if response data is JSON list
    data = json.loads(response.data)
    assert isinstance(data, list)


def test_get_average_payment_value(client, requests_mock):
    """Test the GET /statistics/average_payment_value endpoint"""

    # Mock the get requests that will be made
    requests_mock.get('http://127.0.0.1/api/payments',
                json = [{
                    'payment_id': 'pytest',
                    'amount': 100, 
                    'date': '2024-03-03T00:00:00Z'
                }])
    

    # Make a GET request to get average payment value
    response = client.get('/api/statistics/average_payment_value')

    # Check if response data is a dictionary
    data = json.loads(response.data)
    assert isinstance(data, dict)


def test_get_total_num_users_route(client, requests_mock):
    """Test the GET /statistics/total_num_users endpoint"""

    # Mock the get requests that will be made
    requests_mock.get('http://127.0.0.1:5000/api/users',
                json = [{
                    'user_id': 'pytest',
                    'name': 'John Test', 
                    'email': 'pytest@mail.com',
                    'contact': '44-123456789',
                    'password': '1234',
                    'role':'customer'
                }])
    
    # Make a GET request to get total number of users
    response = client.get('/api/statistics/total_num_users')

    # Check that the returned value is 1
    data = json.loads(response.data)
    assert data == 1

    
def test_get_total_num_customers_route(client, requests_mock):
    """Test the GET /statistics/total_num_customers endpoint"""

    # Mock the get requests that will be made
    requests_mock.get('http://127.0.0.1:5000/api/users/customers',
                json = [{
                    'user_id': 'pytest',
                    'name': 'John Test', 
                    'email': 'pytest@mail.com',
                    'contact': '44-123456789',
                    'password': '1234',
                    'role':'customer'
                }])
    
    # Make a GET request to get total number of users
    response = client.get('/api/statistics/total_num_customers')

    # Check that the returned value is 1
    data = json.loads(response.data)
    assert data == 1


def test_get_total_num_staff_route(client, requests_mock):
    """Test the GET /statistics/total_num_staff endpoint"""

    # Mock the get requests that will be made
    requests_mock.get('http://127.0.0.1:5000/api/users/staff',
                json = [{
                    'user_id': 'pytest',
                    'name': 'John Test', 
                    'email': 'pytest@mail.com',
                    'contact': '44-123456789',
                    'password': '1234',
                    'role':'staff'
                }])
    
    # Make a GET request to get total number of staff 
    response = client.get('/api/statistics/total_num_staff')

    # Check that the returned value is 1
    data = json.loads(response.data)
    assert data == 1


def test_get_total_num_admin_route(client, requests_mock):
    """Test the GET /statistics/total_num_admin endpoint"""

    # Mock the get requests that will be made
    requests_mock.get('http://127.0.0.1:5000/api/users/admins',
                json = [{
                    'user_id': 'pytest',
                    'name': 'John Test', 
                    'email': 'pytest@mail.com',
                    'contact': '44-123456789',
                    'password': '1234',
                    'role':'admin'
                }])
    
    # Make a GET request to get total number of admins 
    response = client.get('/api/statistics/total_num_admin')

    # Check that the returned value is 1
    data = json.loads(response.data)
    assert data == 1


def test_get_total_num_all_users(client, requests_mock):
    """Test the GET /statistics/total_num_users_all endpoint"""

    # Mock the get requests that will be made
    requests_mock.get('http://127.0.0.1:5000/api/users',
                json = [{
                    'user_id': 'pytest',
                    'name': 'John Test', 
                    'email': 'pytest@mail.com',
                    'contact': '44-123456789',
                    'password': '1234',
                    'role':'customer'
                }])
    
    requests_mock.get('http://127.0.0.1:5000/api/users/customers',
            json = [{
                'user_id': 'pytest',
                'name': 'John Test', 
                'email': 'pytest@mail.com',
                'contact': '44-123456789',
                'password': '1234',
                'role':'customer'
            }])

    requests_mock.get('http://127.0.0.1:5000/api/users/staff',
                    json = [{
                        'user_id': 'pytest',
                        'name': 'John Test', 
                        'email': 'pytest@mail.com',
                        'contact': '44-123456789',
                        'password': '1234',
                        'role':'staff'
                    }])

    requests_mock.get('http://127.0.0.1:5000/api/users/admins',
                json = [{
                    'user_id': 'pytest',
                    'name': 'John Test', 
                    'email': 'pytest@mail.com',
                    'contact': '44-123456789',
                    'password': '1234',
                    'role':'admin'
                }])
    
    # Make a GET request to get total number of all user types
    response = client.get('/api/statistics/total_num_users_all')

    # Check if response data is JSON list
    data = json.loads(response.data)
    print(data)
    assert isinstance(data, dict)


def test_get_total_status_count(client, requests_mock):
    """Test the GET /statistics/total_status_count endpoint"""

    # Mock the get requests that will be made
    requests_mock.get('http://127.0.0.1:5000/api/orders',
                    json = [{
                        'order_id': 'pytest',
                        'user_id': 'pytest',
                        'device_id': 'pytest',
                        'date': '2015-02-23',
                        'payment_id': 'pytest',
                        'qr_id': 'pytest',
                        'visibility': False,
                        'status': 'test-status',
                        'data_detail_id': 'pytest',
                        'service_id': 'pytest'
                    }])
    

    # Make a GET request to get counts for each order status
    response = client.get('/api/statistics/total_status_count')

    # Check if response data is JSON list
    data = json.loads(response.data)
    assert isinstance(data, dict)

