from flask import Flask, session
from flask_pymongo import PyMongo
from .config import Config
from flask_cors import CORS


app = Flask(__name__)
app.config.from_object(Config)
mongo = PyMongo(app)
CORS(app)

from app.routes import auth_bp, user_bp, order_bp, staff_bp, device_bp, data_detail_bp

app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(staff_bp, url_prefix='/api')
app.register_blueprint(user_bp, url_prefix='/api')
app.register_blueprint(order_bp, url_prefix='/api')
app.register_blueprint(device_bp, url_prefix='/api')
app.register_blueprint(data_detail_bp, url_prefix='/api')

@app.before_request
def initialize_session_login():
    session['current_user'] = {}