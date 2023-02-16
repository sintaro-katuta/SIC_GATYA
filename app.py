from flask import Flask
from flask import render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_login import UserMixin, LoginManager , login_user , logout_user , login_required
from werkzeug.security import generate_password_hash , check_password_hash


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.db'
db = SQLAlchemy(app)

login_manager = LoginManager()
login_manager.init_app(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(10), nullable=False)
    email = db.Column(db.String(50), nullable=False)

@app.route('/')
def index():
    return render_template("index.html")

#Userログイン
@app.route('/login',method = ['GET','POST'])
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
@app.route('/register',method=['GET','POST'])
def register():
    if request.method == "POST":
        username = request.form.get('user_name')
        password = request.form.get('password')
        user = User(username = username , password = generate_password_hash(password , method= 'sha256'))
        db.session.add(user)
        db.session.commit()
        return redirect('/')
    else:
        return render_template("register.html")
    
@app.route('/logout')
def logout():
    return render_template("logout.html")