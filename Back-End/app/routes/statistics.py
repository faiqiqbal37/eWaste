from . import statistics_bp
from flask import jsonify, request, url_for, session
from .. import mongo
from flask_pymongo import ObjectId
from bson import ObjectId
from ..webscraper_CeX import itemToBeFound
import requests
import datetime



def convert_document(document):
    """Convert ObjectId to string for JSON serialization."""
    for key, value in document.items():
        if isinstance(value, ObjectId):
            document[key] = str(value)
    return document


@statistics_bp.route('/statistics/get_total_device_type', methods=['GET'])
def get_total_device_type():
    try:
        reqAllDevices = requests.get(f"http://127.0.0.1:5000/api/devices")
        if reqAllDevices.ok:
            allDevices = reqAllDevices.json()
            device_type_count_dict = {}
            for device in allDevices:
                    device_type = device['device_type']
                    if device_type in device_type_count_dict:
                        device_type_count_dict[device_type] = device_type_count_dict[device_type] + 1
                    else:
                        device_type_count_dict[device_type] = 1
        return jsonify(device_type_count_dict)

    except Exception as e:
        return f"{e}"

@statistics_bp.route('/statistics/customers', methods=['GET'])
def get_all_customer_statistics():
    try:
        reqAllCustomers = requests.get(f"http://127.0.0.1:5000/api/users/customers")
        allUserArr = []
        if reqAllCustomers.ok:
            userData = reqAllCustomers.json()
            for user in userData:
                user_id = user['user_id']
                statistics = get_customer_statistics(user_id)
                allUserArr.append(statistics)

        

        return jsonify(allUserArr)
    except:
        return {}


@statistics_bp.route('/statistics/user/<user_id>', methods=['GET'])
def get_customer_statistics_server(user_id):
    return jsonify(get_customer_statistics(user_id)), 200

    

def get_customer_statistics(user_id):
    try:
        reqData =requests.get(f"http://127.0.0.1:5000/api/orders/user/{user_id}")
        if reqData.ok:
            data = reqData.json()

            statDict = {}
            statDict["total_num_orders"] = {"total_num_orders": len(data)}
            
            statDict["total_orders_by_date"] = get_order_dates_for_customer(data)
            
            total_device_classification, total_device_type, total_flagged_count, avg_price = get_counts_of_device_attributes_for_customer(data)
            statDict["total_device_classification_count"] = total_device_classification
            statDict["total_device_type_count"] = total_device_type
            statDict["total_flagged_count"] = total_flagged_count
            statDict["avg_price"] = avg_price

            statDict['user_device_visibility_count'] = get_user_device_visibility(data)

            statDict['user_device_status_count'] = get_user_device_status_count(data)

            avg_amount, total_amount = get_customer_statistics_payment(data)

            statDict['avg_amount'] = avg_amount
            statDict['total_amount'] = total_amount
            return (statDict)

        else:
            return ({})
        
    except Exception as e:
        return f"{e}"
    

def get_counts_of_device_attributes_for_customer(data):
    numCountDeviceType = {}
    numCountFlagged = {"flagged_count": 0}
    numCountClassification = {}
    numAvgPrice = {"avg_price": 0}

    try:
        for order in data:
            reqData = requests.get(f'http://127.0.0.1:5000/api/devices/{order["device_id"]}')
            
            device_data = reqData.json()

            classification = device_data['classification']
            flag = device_data['flag']
            device_type = device_data['device_type']
            price = float(device_data['price'])

            numCountClassification[classification] = numCountClassification.get(classification, 0) + 1
            numCountDeviceType[device_type] = numCountDeviceType.get(device_type, 0) + 1
            numAvgPrice["avg_price"] += price

            if flag:
                numCountFlagged["flagged_count"] += 1

        numAvgPrice['avg_price'] = numAvgPrice["avg_price"]/len(data)

        return [numCountClassification, numCountDeviceType, numCountFlagged, numAvgPrice]
    
    except Exception as e:
        return [{"total_device_classification_count": -1}, {"total_device_type_count": -1}, {"total_flagged_count": -1}, {"avg_price": f"{e}"}]

    

def get_customer_statistics_payment(data):
    total_amount_paid = {"total_amount": 0}
    avg_amount_paid = {"avg_amount": 0}

    final_len = len(data)

    try:
        for order in data:
            payment_data = requests.get(f"http://127.0.0.1:5000/api/payments/{order['paymentId']}")
            if payment_data.ok:
                payment_data = payment_data.json()

                amount = payment_data['amount']

                total_amount_paid["total_amount"] += float(amount)
            else:
                final_len -= 1
        
        avg_amount_paid['avg_amount'] = total_amount_paid["total_amount"]/final_len

        return [avg_amount_paid, total_amount_paid]
    
    except Exception as e:
        return [{"avg_amount": -1}, {"total_amount": -1}]



def get_user_device_status_count(data):
    total_device_status = {}
    for order in data:
        status = order['status']
        total_device_status[status] = total_device_status.get(status, 0) + 1
    
    return total_device_status

def get_user_device_visibility(data):
    total_device_status = {}
    for order in data:
        status = "Visible" if order['visibility'] == True else "Not Visible"
        total_device_status[status] = total_device_status.get(status, 0) + 1
    return total_device_status


def get_order_dates_for_customer(data):
    try:
        if len(data)==0:
            return jsonify({"day": -1,
                        "month": -1,
                        "year": -1,
                        "count": -1}), 200
        
        numOrdersDateDict = {}
        
        for order in data:
            datetimeStr = order['date']
            datetimeObj = datetime.datetime.strptime(datetimeStr, "%Y-%m-%d").date()
            if datetimeObj in numOrdersDateDict:
                numOrdersDateDict[datetimeObj] += 1
            else:
                numOrdersDateDict[datetimeObj] = 1
    
        uniqueEl = [{"day": date.day,
                    "month": date.month,
                    "year": date.year,
                    "count": count} for date, count in numOrdersDateDict.items()]
            
        uniqueEl.sort(key=lambda x: (x['year'], x['month'], x['day']))
            
        return uniqueEl
        


    except Exception as e:
        return jsonify({"day": -1,
                        "month": -1,
                        "year": -1,
                        "count": -1})


@statistics_bp.route('/statistics/total_orders_count', methods=['GET'])
def get_total_orders_count():
    try:
        reqData = requests.get("http://127.0.0.1:5000/api/orders")
        data = reqData.json()
        return jsonify({"length": len(data)}), 200


    except Exception as e:
        return jsonify({"length:" -1}), 404

@statistics_bp.route('/statistics/total_orders_by_date', methods=['GET'])
def get_total_orders_by_date():
    try:
        data = requests.get("http://127.0.0.1:5000/api/orders")
        orderList = data.json()


        if len(orderList)==0:
            return jsonify({"day": -1,
                        "month": -1,
                        "year": -1,
                        "count": -1}), 200
        
        numOrdersDateDict = {}
        
        for order in orderList:
            datetimeStr = order['date']
            datetimeObj = datetime.datetime.strptime(datetimeStr, "%Y-%m-%d").date()
            if datetimeObj in numOrdersDateDict:
                numOrdersDateDict[datetimeObj] += 1
            else:
                numOrdersDateDict[datetimeObj] = 1
    
        uniqueEl = [{"day": date.day,
                    "month": date.month,
                    "year": date.year,
                    "count": count} for date, count in numOrdersDateDict.items()]
            
        uniqueEl.sort(key=lambda x: (x['year'], x['month'], x['day']))
            
        return uniqueEl
        


    except Exception as e:
        return jsonify({"day": -1,
                        "month": -1,
                        "year": -1,
                        "count": -1})

@statistics_bp.route('/statistics/average_payment_value', methods=['GET'])
def get_average_payment_value():
    try:
        payments = requests.get("http://127.0.0.1/api/payments")
        payments = payments.json()


        if len(payments) > 0:
            total = 0
            for payment in payments:
                total += payment['amount'] 

            return jsonify({"avg_payment": total/len(payments)})

    except Exception as e:
        return jsonify({"avg_payment": -1})

@statistics_bp.route('/statistics/total_num_users', methods=['GET'])
def get_total_num_users_route():
    return jsonify(get_total_num_users()), 200


def get_total_num_users():
    try:
        users = requests.get("http://127.0.0.1:5000/api/users")
        users = users.json()
        if len(users) > 0:
            return len(users)
        
    except Exception as e:
        pass

@statistics_bp.route('/statistics/total_num_customers', methods=['GET'])
def get_total_num_customers_route():
    return jsonify(get_total_num_customers()), 200



def get_total_num_customers():
    try:
        users = requests.get("http://127.0.0.1:5000/api/users/customers")
        users = users.json()
        if len(users) > 0:
            return (len(users))

    except Exception as e:
        pass

@statistics_bp.route('/statistics/total_num_staff', methods=['GET'])
def get_total_num_staff_route():
    return jsonify(get_total_num_staff()), 200



def get_total_num_staff():
    try:
        users = requests.get("http://127.0.0.1:5000/api/users/staff")
        users = users.json()
        if len(users) > 0:
            return (len(users))

    except Exception as e:
        pass


@statistics_bp.route('/statistics/total_num_admin', methods=['GET'])
def get_total_num_admin_route():
    return jsonify(get_total_num_admin()), 200


def get_total_num_admin():
    try:
        users = requests.get("http://127.0.0.1:5000/api/users/admins")
        users = users.json()
        if len(users) > 0:
            return (len(users))

    except Exception as e:
        pass

@statistics_bp.route('/statistics/total_num_users_all', methods=['GET'])
def get_total_num_all_users():
    total_users = {"users": get_total_num_users(),
                   "customers": get_total_num_customers(),
                   "staff": get_total_num_staff(),
                   "admin": get_total_num_admin()}
    
    return jsonify(total_users), 200

@statistics_bp.route('/statistics/total_status_count', methods=['GET'])
def get_total_status_count():
    try:
        reqAllOrders = requests.get(f"http://127.0.0.1:5000/api/orders")
        if reqAllOrders.ok:
            allOrders = reqAllOrders.json()
            order_status_count_dict = {}
            for order in allOrders:
                    order_status = order['status']
                    if order_status in order_status_count_dict:
                        order_status_count_dict[order_status] = order_status_count_dict[order_status] + 1
                    else:
                        order_status_count_dict[order_status] = 1
        return jsonify(order_status_count_dict)

    except Exception as e:
        return f"{e}"