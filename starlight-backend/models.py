from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin, LoginManager
from datetime import datetime

login = LoginManager()
db = SQLAlchemy()
 
class UserModel(UserMixin, db.Model):
    __tablename__ = 'users'
 
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(80), unique=True, nullable=False)
    first = db.Column(db.String(100), nullable=False)
    last = db.Column(db.String(100), nullable=False)
    password_hash = db.Column(db.String(), nullable=False)
 
    def set_password(self,password):
        self.password_hash = generate_password_hash(password)
     
    def check_password(self,password):
        return check_password_hash(self.password_hash,password)
    

class PostModel(db.Model):
    __tablename__ = 'posts'
 
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    author = db.Column(db.String(80), unique=True, nullable=False)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    likes = db.Column(db.Integer, nullable=False)
    label = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
 
    @property
    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'author': self.author,
            'content': self.content,
            'likes': self.likes,
            'label': self.label,
            'created_at': self.created_at,
        }
        
    
@login.user_loader
def load_user(id):
    return UserModel.query.get(int(id))