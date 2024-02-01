from flask import Flask
from flask_cors import CORS
from flask_pymongo import PyMongo

mongo = PyMongo()

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config['SECRET_KEY'] = 'twoj_sekret'
    app.config['MONGO_URI'] = 'mongodb://localhost:27017/twoja_baza_danych'

    mongo.init_app(app)

    from .routes import api as main_blueprint
    app.register_blueprint(main_blueprint)

    return app
