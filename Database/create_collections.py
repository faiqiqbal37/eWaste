import pymongo
from jsonschema import validate, ValidationError

# Connect to the MongoDB server
myclient = pymongo.MongoClient("mongodb+srv://Paul:252820@teamproject.w68yt3f.mongodb.net/?retryWrites=true&w=majority&appName=TeamProject")

# Create a database (if it doesn't exist)
mydb = myclient['mydatabase']

# Define a JSON Schema function to merge the defined content

def merge_into_list(*args):
    """
    Merges multiple dictionaries into a list.

    Parameters:
        *args: An arbitrary number of dictionaries.

    Returns:
        A list containing all dictionaries.
    """
    merged_list = []
    for schema in args:
        # Add the dictionary to the list
        merged_list.append(schema)
    return merged_list

# Define a function that validate and create collections
def create_collections(collection_name, collection_schema, doc_to_insert):
    """
    Checks if a collection exists. If it does, returns a message; if not, validates and inserts a document into it.

    Parameters:
    - collection_name: The name of the collection to insert the document into.
    - collection_schema: The schema to validate the document against.
    - doc_to_insert: The document to be inserted.

    Returns:
    - A message indicating the outcome of the operation.
    """
    try:
        # Check if the collection exists
        if collection_name in mydb.list_collection_names():
            return "The collection already exists. No document inserted."
        else:
            # Validate the document against the schema
            validate(instance=doc_to_insert, schema=collection_schema)

            # Since the collection does not exist, it will be created upon inserting the first document
            collection = mydb[collection_name]

            # Insert the document into the collection
            collection.insert_one(doc_to_insert)
            return "The collection did not exist. It has been created, and the document inserted successfully."
    except ValidationError as e:
        # Handle validation error
        return f"Document validation failed: {e}"
    except Exception as e:
        # Handle other potential errors (e.g., database connection issues)
        return f"An error occurred: {e}"

'''
The schemas for the collections
'''

# MongoDB schema for user collection
user_schema = {
    'user_id': {'type': 'string', 'unique': True, 'required': True},
    'name': {'type': 'string', 'required': True},
    'email': {'type': 'string', 'required': True, 'unique': True},
    'password': {'type': 'string', 'required': True},
    'role': {'type': 'string', 'allowed': ['customer', 'staff', 'admin'], 'required': True}
}

# MongoDB schema for order collection with data relations
order_schema = {
    'order_id': {'type': 'string', 'unique': True, 'required': True},
    'user_id': {'type': 'string', 'required': True, 'data_relation': {'collection': 'user', 'field': 'user_id'}},
    'device_id': {'type': 'string', 'required': True, 'data_relation': {'collection': 'device', 'field': 'device_id'}},
    'date': {'type': 'string', 'required': True},
    'payment_id': {'type': 'string', 'required': True, 'data_relation': {'collection': 'payments', 'field': 'payment_id'}},
    'qr_id': {'type': 'string', 'required': True, 'data_relation': {'collection': 'qr', 'field': 'qr_id'}},
    'visibility': {'type': 'boolean', 'required': True},
    'data_detail_id': {'type': 'string', 'required': True, 'data_relation': {'collection': 'data_detail', 'field': 'data_detail_id'}}
}

# MongoDB schema for device collection
device_schema = {
    'device_id': {'type': 'string', 'unique': True, 'required': True},
    'device_name': {'type': 'string', 'required': True},
    'device_type': {'type': 'string', 'required': True},
    'photos': {'type': ['string'], 'required': True},
    'price': {'type': 'number', 'required': True},
    'classification': {'type': 'string', 'required': False},
    'flag': {'type': 'boolean', 'required': False}
}

# MongoDB schema for qr collection
qr_schema = {
    'qr_id': {'type': 'string', 'unique': True, 'required': True},
    'qr_link': {'type': 'string', 'required': True}
}

# MongoDB schema for type of service collection
service_schema = {
    'service_id': {'type': 'string', 'unique': True, 'required': True},
    'service_name': {'type': 'string', 'required': True}
}

# MongoDB schema for payments collection with data relations
payment_schema = {
    'payment_id': {'type': 'string', 'unique': True, 'required': True},
    'amount': {'type': 'number', 'required': True},
    'date': {'type': 'string', 'required': True}
}

# MongoDB schema for data detail collection
data_detail_schema = {
    'data_detail_id': {'type': 'string', 'unique': True, 'required': True},
    'data_link': {'type': 'string', 'required': True}
}


'''
The document instance for validating the collections.
'''

# Example document for the user collection
user_document = {
    'user_id': 'userid123',
    'name': 'John Doe',
    'email': 'johndoe@example.com',
    'password': 'hashed_password',
    'role': 'customer'
}

# Example document for the order collection
order_document = {
    'order_id': 'orderid123',
    'user_id': 'userid123',  # Reference to the user document's user_id
    'device_id': 'deviceid123',  # Reference to the device document's device_id
    'date': '2024-03-03T00:00:00Z',  # Example date in ISO format
    'payment_id': 'paymentid123',  # Reference to the payment document's payment_id
    'qr_id': 'qrid123',  # Reference to the QR document's qr_id
    'visibility': True,
    'data_detail_id': 'datadetailid123'  # Reference to the data detail document's data_detail_id
}

# Example document for the device collection
device_document = {
    'device_id': 'deviceid123',
    'device_name': 'Smartphone X1000',
    'device_type': 'Smartphone',
    'photos': ['photo1.jpg', 'photo2.jpg'],
    'price': 299.99,
    'classification': 'current',
    'flag': False
}

# Example document for the qr collection
qr_document = {
    'qr_id': 'qrid123',
    'qr_link': 'http://example.com/qr/1'
}

# Example document for the type of service collection
service_document = {
    'service_id': 'serviceid123',
    'service_name': 'Data Wiping'
}

# Example document for the payments collection
payment_document = {
    'payment_id': 'paymentid123',
    'amount': 49.99,
    'date': '2024-03-03T00:00:00Z'  # Example date in ISO format
}

# Example document for the data detail collection
data_detail_document = {
    'data_detail_id': 'datadetailid123',
    'data_link': 'http://example.com/data/123'
}




schemas_list = merge_into_list(user_schema, order_schema, device_schema,qr_schema,
                            service_schema,payment_schema,data_detail_schema)
doc_list = merge_into_list(user_document,order_document,device_document,qr_document,
                           service_document,payment_document,data_detail_document)
name_list = ['user_collection','order_collection','device_collection','qr_collection',
             'service_collection','payment_collection','data_detail_collection']

pairs = [(name_list[i],schemas_list[i],doc_list[i]) for i in range(len(schemas_list))]

for pair in pairs:
    create_collections(pair[0],pair[1],pair[2])



