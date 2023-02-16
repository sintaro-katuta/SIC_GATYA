from flask import Flask
from flask import render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_login import UserMixin, LoginManager , login_user , logout_user , login_required
from werkzeug.security import generate_password_hash , check_password_hash


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///user.db'
db = SQLAlchemy(app)

login_manager = LoginManager()
login_manager.init_app(app)

class User(UserMixin,db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(10), nullable=False)
    email = db.Column(db.String(50), nullable=False)

@app.route('/')
def index():
    return render_template("index.html")

#Userログイン
@app.route('/login',methods = ['GET','POST'])
def login():
    if request.method == "POST":
        username = request.form.get('username')
        password = request.form.get('password')

        #取得したusernameとuserテーブルのusernameと一致するユーザを取得
        user = User.query.filterby(username = username).first()
        if check_password_hash(user.password,password):
            login_user(user)
        return redirect('/')
    else:
        return render_template("login.html")

#User新規登録
@app.route('/register',methods=['GET','POST'])
def register():
    if request.method == "POST":
        username = request.form.get('user_name')
        password = request.form.get('password')
        email = request.form.get('email')
        user = User(username = username , password = generate_password_hash(password , method= 'sha256') , email = email)
        db.session.add(user)
        db.session.commit()
        return redirect('/')
    else:
        return render_template("register.html")
    
@app.route('/logout')
def logout():
    return render_template("logout.html")

@login_manager.user_loader
def load_user(id):
    return User.query.get(int(id))