import pymongo
from jsonschema import validate, ValidationError

# Connect to the MongoDB server
myclient = pymongo.MongoClient("mongodb+srv://Paul:252820@teamproject.w68yt3f.mongodb.net/?retryWrites=true&w=majority&appName=TeamProject")

# Create a database (if it doesn't exist)
mydb = myclient['mydatabase']

# Create a collection (table) in the database
userCollection = mydb['userCollection']

# Define a JSON Schema for document validation
user_collection_schema = {
    'validator': {
        '$jsonSchema': {
            'bsonType': 'object',
            'properties': {
                'userID': {'bsonType': 'string'},
                'userName': {'bsonType': 'string'},
                'role': {'bsonType': 'string'},
                'password': {'bsonType': 'string'},
                'email': {'bsonType': 'string'},
                'phoneNumber': {'bsonType': 'string'},
                'isThirdPartyLogin': {'bsonType': 'bool'},
                'devices': {
                    'bsonType': 'array',
                    'items': {
                        'bsonType': 'object',
                        'properties': {
                            'deviceID': {'bsonType': 'string'},
                            'deviceType': {'bsonType': 'string'},
                            'brand': {'bsonType': 'string'},
                            'deviceName': {'bsonType': 'string'},
                            'price': {'bsonType': 'double'},
                            'deviceRegistrationDate': {'bsonType': 'date'},
                            'category': {'bsonType': 'string'},
                            'status': {'bsonType': 'string'},
                            'qrID': {'bsonType': 'string'},
                            'qrLink': {'bsonType': 'string'},
                            'dataSecurity': {
                                'bsonType': 'object',
                                'properties': {
                                    'dataDetailID': {'bsonType': 'string'},
                                    'dataLink': {'bsonType': 'string'},
                                    'dataWipeConsent': {'bsonType': 'bool'},
                                    'dataRetrievalRequests': {'bsonType': 'string'}
                                },
                                'required': ['dataWipeConsent', 'dataRetrievalRequests']
                            }
                        },
                        'required': ['deviceID', 'deviceType', 'deviceName', 'price', 'category', 'status', 'dataSecurity']
                    }
                },
            },
            'required': ['userID', 'userName', 'password', 'email', 'role', 'phoneNumber', 'isThirdPartyLogin', 'devices']
        }
    }
}



# Validate and insert a document into the collection
document_to_insert = {
    "userID": "user123",
    "userName": "John Doe",
    "role": "user",
    "password": "password123",
    "email": "john.doe@example.com",
    "phoneNumber": "1234567890",
    "isThirdPartyLogin": False,
    "devices": [
        {
            "deviceID": "device123",
            "deviceType": "smartphone",
            "brand": "BrandX",
            "deviceName": "BrandX SuperPhone",
            "price": 999.99,
            "deviceRegistrationDate": "2023-03-01T00:00:00Z",
            "category": "smartphone",
            "status": "new",
            "qrID": "qr123",
            "qrLink": "http://example.com/qr123",
            "dataSecurity": {
                "dataDetailID": "data123",
                "dataLink": "http://example.com/data123",
                "dataWipeConsent": True,
                "dataRetrievalRequests": "none"
            }
        }
    ]
}


try:
    # Validate the document against the schema
    validate(document_to_insert, user_collection_schema)

    # Insert the document into the collection
    userCollection.insert_one(document_to_insert)
    print("Document inserted successfully")
except ValidationError as e:
    # Handle validation error
    print(f"Document validation failed: {e}")
