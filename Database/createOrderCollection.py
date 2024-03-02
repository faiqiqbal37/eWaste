import pymongo
from jsonschema import validate, ValidationError

# Connect to the MongoDB server
myclient = pymongo.MongoClient("mongodb+srv://Paul:252820@teamproject.w68yt3f.mongodb.net/?retryWrites=true&w=majority&appName=TeamProject")

# Create a database (if it doesn't exist)
mydb = myclient['mydatabase']

# Create a collection (table) in the database
orderCollection = mydb['orderCollection']

# Define a JSON Schema for document validation
order_collection_schema = OrderCollectionSchema = {
    'validator': {
        '$jsonSchema': {
            'bsonType': 'object',
            'properties': {
                'orderID': {'bsonType': 'string'},
                'userID': {'bsonType': 'string'},  # Link to the user placing the order
                'deviceID': {'bsonType': 'string'},  # Device being ordered
                'orderStatus': {'bsonType': 'string'},
                'orderDate': {'bsonType': 'date'},
                'details': {
                    'bsonType': 'object',
                    'properties': {
                        'price': {'bsonType': 'double'},
                        'description':{'bsonType':'string'},
                        'shippingAddress': {'bsonType': 'string'}
                    },
                    'required': ['price','description']
                }
            },
            'required': ['orderID', 'userID', 'deviceID', 'orderStatus', 'orderDate', 'details']
        }
    }
}




# Validate and insert a document into the collection
document_to_insert = {
    'orderID': 'order002',
    'userID': 'user002',
    'deviceID': 'device002',
    'orderStatus': 'shipped',
    'orderDate': '2024-02-20T00:00:00Z',
    'details': {
        'price': 1300.00,
        'description': 'BrandY UltraLaptop, 16GB RAM, 1TB SSD',
        'shippingAddress': '456 Secondary St, OtherTown, OT'
    }
}


try:
    # Validate the document against the schema
    validate(document_to_insert, order_collection_schema)

    # Insert the document into the collection
    orderCollection.insert_one(document_to_insert)
    print("Document inserted successfully")
except ValidationError as e:
    # Handle validation error
    print(f"Document validation failed: {e}")
