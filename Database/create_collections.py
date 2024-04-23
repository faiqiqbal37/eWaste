import pymongo
from pymongo import errors

# Connect to the MongoDB server

myclient = pymongo.MongoClient("mongodb+srv://Paul:252820@teamproject.w68yt3f.mongodb.net"
                               "/?retryWrites=true&w=majority&appName=TeamProject")

# Create a database (if it doesn't exist)
db = myclient['mydatabase']

# Define a function to merge the prepared content


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


'''
create unique indexes for the collections
'''
user_unique_indexes = [('user_id', 1), ('email', 1), ('contact', 1)]
order_unique_indexes = [('order_id', 1)]
device_unique_indexes = [('device_id', 1)]
qr_unique_indexes = [('qr_id', 1)]
service_unique_indexes = [('service_id', 1)]
payments_unique_indexes = [('payment_id', 1)]
data_detail_unique_indexes = [('data_detail_id', 1)]

'''
set schema validators
'''
user_validator = {
    '$jsonSchema': {
        'bsonType': 'object',
        'required': ['user_id', 'name', 'email', 'contact', 'password', 'role'],
        'properties': {
            'user_id': {
                'bsonType': 'string',
                'description': 'unique user identifier'
            },
            'name': {
                'bsonType': 'string'
            },
            'email': {
                'bsonType': 'string'
            },
            'contact': {
                'bsonType': 'string'
            },
            'password': {
                'bsonType': 'string'
            },
            'role': {
                'bsonType': 'string',
                'enum': ['customer', 'staff', 'admin']
            }
        }
    }
}

order_validator = {
    '$jsonSchema': {
        'bsonType': 'object',
        'required': ['order_id', 'user_id', 'device_id', 'date',
                     'payment_id', 'qr_id', 'visibility', 'status', 'data_detail_id', 'service_id'],
        'properties': {
            'order_id': {
                'bsonType': 'string'
            },
            'user_id': {
                'bsonType': 'string'
            },
            'device_id': {
                'bsonType': 'string'
            },
            'date': {
                'bsonType': 'string'
            },
            'payment_id': {
                'bsonType': 'string'
            },
            'qr_id': {
                'bsonType': 'string'
            },
            'visibility': {
                'bsonType': 'bool'
            },
            'status': {
                'bsonType': 'string'
            },
            'data_detail_id': {
                'bsonType': 'string'
            },
            'service_id': {
                'bsonType': 'string'
            }
        }
    }
}

device_validator = {
    '$jsonSchema': {
        'bsonType': 'object',
        'required': ['device_id', 'device_name', 'device_type', 'photos', 'price'],
        'properties': {
            'device_id': {
                'bsonType': 'string'
            },
            'device_name': {
                'bsonType': 'string'
            },
            'device_type': {
                'bsonType': 'string'
            },
            'photos': {
                'bsonType': 'array',
                'items': {
                    'bsonType': 'string'
                }
            },
            'price': {
                'bsonType': 'number'
            },
            'classification': {
                'bsonType': 'string'
            },
            'flag': {
                'bsonType': 'bool'
            }
        }
    }
}

qr_validator = {
    '$jsonSchema': {
        'bsonType': 'object',
        'required': ['qr_id'],
        'properties': {
            'qr_id': {
                'bsonType': 'string',
            },
            'qr_link': {
                'bsonType': 'string',
            }
        }
    }
}

service_validator = {
    '$jsonSchema': {
        'bsonType': 'object',
        'required': ['service_id', 'service_name'],
        'properties': {
            'service_id': {
                'bsonType': 'string',
            },
            'service_name': {
                'bsonType': 'string',
            }
        }
    }
}

payments_validator = {
    '$jsonSchema': {
        'bsonType': 'object',
        'required': ['payment_id', 'amount', 'date'],
        'properties': {
            'payment_id': {
                'bsonType': 'string',
            },
            'amount': {
                'bsonType': 'number',
            },
            'date': {
                'bsonType': 'string',
            }
        }
    }
}

data_detail_validator = {
    '$jsonSchema': {
        'bsonType': 'object',
        'required': ['data_detail_id'],
        'properties': {
            'data_detail_id': {
                'bsonType': 'string',
            },
            'data_link': {
                'bsonType': 'string',
            }
        }
    }
}


'''
The document instance for validating the collections.
'''

# Example document for the user collection
user_document = {
    'user_id': 'userid123',
    'name': 'John Doe',
    'email': 'johndoe@example.com',
    'contact': '1234567890',
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
    'status': 'Pending',
    'data_detail_id': 'datadetailid123',  # Reference to the data detail document's data_detail_id
    'service_id': 'serviceid123',  # Reference to the service document's data_detail_id
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

# Define a function that validate and create collections


def create_collections(collection_name, collection_validator, unique_indexes, doc_to_insert):
    """
    Checks if a collection exists. If it does, returns a message;
    if not, creates it with a validator, sets unique indexes, and inserts a document.

    Parameters:
    - collection_name: The name of the collection.
    - collection_validator: The JSON schema validator for the collection.
    - unique_indexes: A list of tuples with index field and direction for setting unique indexes.
    - doc_to_insert: The document to be inserted.
    """
    try:
        # Check if the collection exists
        if collection_name in db.list_collection_names():
            print("The collection already exists. No document inserted.")
        else:
            # Create the collection with the validator
            db.create_collection(collection_name, validator=collection_validator)

            # Set unique indexes
            for index in unique_indexes:
                db[collection_name].create_index([index], unique=True)

            # Insert the document into the collection
            db[collection_name].insert_one(doc_to_insert)
            print("The collection did not exist. "
                  "It has been created with the validator and unique indexes, and the document inserted successfully.")
    except errors.CollectionInvalid:
        print("The collection could not be created due to invalid specifications.")
    except errors.DuplicateKeyError:
        print("A document with the same unique key already exists.")
    except Exception as e:
        print(f"An error occurred: {e}")


index_list = merge_into_list(user_unique_indexes, order_unique_indexes, device_unique_indexes, qr_unique_indexes,
                             service_unique_indexes, payments_unique_indexes, data_detail_unique_indexes)

validator_list = merge_into_list(user_validator, order_validator, device_validator, qr_validator,
                                 service_validator, payments_validator, data_detail_validator)

doc_list = merge_into_list(user_document, order_document, device_document, qr_document,
                           service_document, payment_document, data_detail_document)

name_list = ['user_collection', 'order_collection', 'device_collection', 'qr_collection',
             'service_collection', 'payment_collection', 'data_detail_collection']

pairs = [(name_list[i], validator_list[i], index_list[i], doc_list[i]) for i in range(len(index_list))]

for pair in pairs:
    create_collections(*pair)
