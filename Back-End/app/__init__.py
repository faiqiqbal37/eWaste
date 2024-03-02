from flask import Flask
from flask_pymongo import PyMongo
from .config import Config



app = Flask(__name__)
app.config.from_object(Config)
mongo = PyMongo(app)


from app.routes import auth_bp, user_bp

app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(user_bp, url_prefix='/api')
