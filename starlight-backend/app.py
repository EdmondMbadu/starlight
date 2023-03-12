# app.py
from flask import Flask, flash, g, jsonify, redirect, render_template, request, session
from flask_cors import CORS
from flask_login import current_user, login_required, logout_user
from models import db, login, UserModel, PostModel, Like
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
migrate = Migrate(app, db, render_as_batch=True)
jwt = JWTManager(app)
login.init_app(app)
login.login_view = 'login'


@app.before_first_request
def create_table():
    db.create_all()


################ AUTHENTICATION ROUTES ###############
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


################ USER MODEL RELATED ROUTES ###############
def get_current_user_id():
    return session.get('user_id')
    
    
@app.route('/api/current_user')
def get_current_user():
    user_id = session.get('user_id')
    if user_id:
        user_data = UserModel.query.filter_by(id=user_id).first()
        return jsonify(user_data.serialize())
    else:
        return jsonify({'error': 'Not authorized, user not logged in'})


@app.route('/api/update-profile', methods=['PUT'])
def update_profile():
    # if request.method == 'PUT':
    user_id = session.get('user_id')
    if user_id:
        user = UserModel.query.filter_by(id=user_id).first()
        data = request.get_json()
        # user = UserModel.query.filter_by(id=id).first()
        password = data['old-password']
        
        if user.check_password(password):
            user.first = data['first']
            user.last = data['last']
            new_password = data['new-password']
            user.set_password(new_password)
            
            # db.session.add(user)
            db.session.commit()
            return jsonify({'message': 'Profile updated successfully'})
        else:
            return jsonify({'error': 'Old password does not match our records'})
        
    else:
        return jsonify({'error': 'Not authorized, user not logged in'})
 
    
@app.route('/api/users', methods=['GET'])
def get_all_users():
    users = UserModel.query.all()
    user_list = []
    for user in users:
        user_list.append(user.serialize())
    return jsonify(user_list)
    

@app.route('/api/users/<int:id>', methods=['GET'])
def get_user_by_id(id):
    user = UserModel.query.filter_by(id=id).first()
    if user:
        return jsonify(user.serialize())
    else:
        return jsonify({'error': 'User not found by id', 'message':id}), 404


################ POST MODEL RELATED ROUTES ###############
@app.route('/api/new-post', methods=['POST'])
def create_new_post():
    data = request.get_json()
    user_id = session.get('user_id')
    if user_id:
        user = UserModel.query.filter_by(id=user_id).first()
        author_id = user.id
        author_name = user.get_full_name()
        title = data['title']
        content = data['content']
        likes = 0
        label = data['label']
        
        new_post = PostModel(author_id=author_id, author_name=author_name, title=title, content=content, likes=likes, label=label)
        db.session.add(new_post)
        db.session.commit()
        
        return jsonify({'message': 'Post was added successfully', 'post': new_post.serialize()}), 200
    else:
        return jsonify({'error': 'User does not exit to create new post'}), 404
        
            
@app.route('/api/posts', methods=['GET'])
def get_all_posts():
    posts = PostModel.query.all()
    post_list = []
    for post in posts:
        post_list.append(post.serialize())
    return jsonify(post_list)
    

@app.route('/api/user-posts', methods=['GET'])
def get_user_posts():
    user_id = session.get('user_id')
    if user_id:
        posts = PostModel.query.filter_by(author_id=user_id)
        post_list = []
        for post in posts:
            post_list.append(post.serialize())
            
        sorted_posts = sorted(post_list, key=lambda x: x['created_at'], reverse=True)
        return jsonify(sorted_posts)
    else:
        return jsonify({'error':'User not found to display their posts'})


@app.route('/api/posts/<int:post_id>', methods=['GET'])
def get_post_by_id(post_id):
    post = PostModel.query.filter_by(id=post_id).first()
    if post:
        return jsonify(post.serialize())
    else:
        return jsonify({'error': 'Post not found by post_id', 'message':id}), 404

#liking a post
@app.route('/api/posts/<int:post_id>/like', methods=['POST'])
def like_post(post_id):
    # post = PostModel.query.get(post_id)
    user_id = get_current_user_id()
    
    # if post is None:
    #     return jsonify({'error': 'Post does not exist to be liked'}), 404
    
    # user_id = session.get('user_id')
    # if user_id:
    # Check if the user has already liked the post before
    like = Like.query.filter_by(post_id=post_id, user_id=user_id).first()
    
    if like:
        # If the user has already liked the post before, remove the like from the database
        db.session.delete(like)
        db.session.commit()
        
        # Decrement the number of likes for that post
        post = PostModel.query.get(post_id)
        post.likes = Like.query.filter_by(post_id=post_id).count()
        db.session.commit()
    
        return jsonify({'success': True, 'action': 'unliked'})
    else:
        # If the user has not liked the post before, add a new like entry to the database
        like = Like(post_id=post_id, user_id=user_id)
        db.session.add(like)
        db.session.commit()
        
        # Increment the number of likes for that post
        post = PostModel.query.get(post_id)
        post.likes = Like.query.filter_by(post_id=post_id).count()
        db.session.commit()
        
        return jsonify({'success': True, 'action': 'liked'})


@app.route('/api/posts/<int:post_id>/likes', methods=['GET'])
def get_post_likes(post_id):
    likes = Like.query.filter_by(post_id=post_id).all()
    like_list = []
    for like in likes:
        like_list.append(like.serialize()
                         )
    return jsonify(like_list)


@app.route('/api/delete-post/<int:post_id>', methods=["DELETE"])
def delete_post(post_id):
    post = PostModel.query.filter_by(id=post_id).first()
    db.session.delete(post)
    db.session.commit()
 
    return jsonify("Post was deleted"),200


# running the server
if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True) # to allow for debugging and auto-reload