from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from google.oauth2 import service_account
from googleapiclient.http import MediaFileUpload
import json
import os


# File where service account credentials are stored
file_path = "app/gdrive_credentials.json"

# Full access to Google Drive
scopes = ['https://www.googleapis.com/auth/drive']

# id of folder where files should be uploaded
parent_folder_id = "1g6GwxgF_F0cCvkST8nDe1AJDnhKdm8-t"


# Upload device data to Google Drive and return shared link for access
def get_shared_link(device_data):
    
    # Serializing json
    json_object = json.dumps(device_data, indent=4)
    
    # Writing to local json file
    with open("temp.json", "w") as outfile:
        outfile.write(json_object)

    # Load credentials and scope
    credentials = service_account.Credentials.from_service_account_file(
    file_path)
    scoped_credentials = credentials.with_scopes(scopes)

    try: 
        # Build the Google Drive servcice object
        service = build('drive', 'v3', credentials=scoped_credentials)    

        if "device_name" in device_data:
            name = device_data["device_name"]
        else:
            name = "device_data"

        # Upload json file
        file_metadata = {
            'name': f'{name}.json',
            'parents': [parent_folder_id]
        }
        media = MediaFileUpload('temp.json',
                                mimetype='application/json')
        file = service.files().create(body=file_metadata,
                                            media_body=media,
                                            fields='id').execute()
        file_id = file.get('id')
        print('File ID: %s' % file_id)

        # Make file available to anyone
        permissions = {
            'type': 'anyone',
            'role': 'reader',
        }
        service.permissions().create(fileId=file_id, body=permissions).execute()

        result = service.files().get(fileId=file_id, fields="id, name, webViewLink").execute()

        if not result:
            print('Uploaded file could not be found')
            return None
        else:
            return result['webViewLink']
        
    except HttpError as error:
        print(f'An HTTP error occurred while uploading file: {error}')
    except Exception as e:
        print(f'An exception occured while uploading file: {e}')
    
    

if __name__ == "__main__": 
    device_data = {
        "device_name": "iphone 12",
        "device_type": "Mobile",
        "price": 19251
    }
    print(get_shared_link(device_data))