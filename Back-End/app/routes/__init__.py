from flask import Blueprint

auth_bp = Blueprint('auth', __name__)
user_bp = Blueprint('user', __name__)
order_bp = Blueprint('order', __name__)
staff_bp = Blueprint('staff', __name__)
device_bp = Blueprint('device', __name__)
data_detail_bp = Blueprint('data_detail', __name__)
payment_bp = Blueprint('payment', __name__)
backend_session_bp = Blueprint('backend_session', __name__)
qr_code_bp = Blueprint('qr_code', __name__)
service_bp = Blueprint('service',__name__)
statistics_bp = Blueprint('statistics', __name__)
stripe_bp = Blueprint('stripe', __name__)



from . import auth, user, order, staff, device, data_detail, payment, backend_session,\
qr_code, service, statistics, stripe