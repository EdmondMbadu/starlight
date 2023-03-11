# app.py
from flask import Flask, flash, g, jsonify, redirect, render_template, request, session
from flask_cors import CORS
from flask_login import login_required, logout_user
from models import db, login, UserModel
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, create_access_token

# from db import Database

# DATABASE_PATH = '../starlight-db/starlight.db'

app = Flask(__name__) # name for the Flask app (refer to output)
app.config['SECRET_KEY'] = 'xyz##s3crwtK*'
app.config['JWT_SECRET_KEY'] = 's3cr3!#&7-21jhF'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///starlight.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app, resources={r"/api/*": {"origins": "http://localhost:4200"}})

db.init_app(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)
login.init_app(app)
login.login_view = 'login'


@app.before_first_request
def create_table():
    db.create_all()


@app.route('/api/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        email = data['email']
        password = data['password']
        user = UserModel.query.filter_by(email=email).first()
        if user and user.check_password(password):
            session['user_id'] = user.id
            access_token = create_access_token(identity=email)
            return jsonify({'message': 'Login is successfull', 'token': access_token}), 200
        else:
            return jsonify({'error': 'Invalid username or password'}), 401


@app.route('/api/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        data = request.get_json()
        email = data['email']
        password = data['password']
        first = data['first']
        last = data['last']
        user = UserModel.query.filter_by(email=email).first()
        if user:
            return jsonify({'error': 'Email already exists'}), 401
        else:
            new_user = UserModel(email=email, first=first, last=last)
            new_user.set_password(password)
            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id
            return jsonify({'message': 'new user registered successfully'}), 200


@app.route('/api/data')
def data():
    if 'user_id' in session:
        return jsonify({'data': 'The user is logged in'})
    else:
        return jsonify({'error': 'Not authorized, user not logged in'})


@app.route('/api/logout')
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'Logged out successfully'}), 200

# running the server
if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True) # to allow for debugging and auto-reload