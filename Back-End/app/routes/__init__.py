from flask import Blueprint

auth_bp = Blueprint('auth', __name__)
user_bp = Blueprint('user', __name__)
order_bp = Blueprint('order', __name__)
staff_bp = Blueprint('staff', __name__)
device_bp = Blueprint('device', __name__)
data_detail_bp = Blueprint('data_detail', __name__)

from . import auth, user, order, staff, device, data_detail