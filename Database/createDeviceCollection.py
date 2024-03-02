import pymongo
from jsonschema import validate, ValidationError

# Connect to the MongoDB server
myclient = pymongo.MongoClient("mongodb+srv://Paul:252820@teamproject.w68yt3f.mongodb.net/?retryWrites=true&w=majority&appName=TeamProject")

# Create a database (if it doesn't exist)
mydb = myclient['mydatabase']

# Create a collection (table) in the database
deviceCollection = mydb['deviceCollection']

# Define a JSON Schema for document validation
device_collection_schema = {
    'validator': {
        '$jsonSchema': {
            'bsonType': 'object',
            'properties': {
                'deviceID': {'bsonType': 'string'},
                'userID': {'bsonType': 'string'},  # Reference to the user
                'deviceType': {'bsonType': 'string'},
                'Visibility': {'bsonType': 'boolean'},
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
            'required': ['deviceID', 'userID', 'deviceType', 'deviceName','Visibility', 'price', 'category', 'status', 'dataSecurity']
        }
    }
}



# Validate and insert a document into the collection
document_to_insert = {
    'deviceID': 'device001',
    'userID': 'user001',
    'deviceType': 'laptop',
    'Visibility': True,
    'brand': 'BrandY',
    'deviceName': 'BrandY UltraLaptop',
    'price': 1200.00,
    'deviceRegistrationDate': '2024-01-01T00:00:00Z',
    'category': 'laptop',
    'status': 'used',
    'qrID': 'qr001',
    'qrLink': 'http://example.com/qr001',
    'dataSecurity': {
        'dataDetailID': 'data001',
        'dataLink': 'http://example.com/data001',
        'dataWipeConsent': True,
        'dataRetrievalRequests': 'requested'
    }
}


try:
    # Validate the document against the schema
    validate(document_to_insert, device_collection_schema)

    # Insert the document into the collection
    deviceCollection.insert_one(document_to_insert)
    print("Document inserted successfully")
except ValidationError as e:
    # Handle validation error
    print(f"Document validation failed: {e}")
