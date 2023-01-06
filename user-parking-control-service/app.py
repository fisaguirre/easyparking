# Import flask module
from flask import Flask, jsonify, request
import re
import jwt
from functools import wraps
from database_conexion import obtener_conexion
from controller import signup
from controller import signin

from flask_mysqldb import MySQL
import MySQLdb.cursors


app = Flask(__name__)

obtener_conexion(app)

"""
app.config['SECRET_KEY'] = 'your secret key'
app.config['MYSQL_HOST'] = 'db_user_parking_control_service'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Fernandoroot2023.'
app.config['MYSQL_DB'] = 'userparkingcontrol'
"""
mysql = MySQL(app)

#SECRET_KEY = 'your secret key'


def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']

        if not token:
            return jsonify({'message': 'a valid token is missing'})
        try:
            data = jwt.decode(
                token, app.config['SECRET_KEY'], algorithms=["HS256"])
            #current_user = Users.query.filter_by(public_id=data['public_id']).first()

            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute(
                'SELECT * FROM usuario WHERE usuario.username = "admin1"')
            current_user = cursor.fetchone()

            cursor.close()

        except:
            return jsonify({'message': 'token is invalid'})

        return f(current_user, *args, **kwargs)
    return


@app.route('/')
def index():
    # return 'Hello to Flask- This is user-parking-control-service!'
    return 'a sfffss!'


@app.route('/signup', methods=['POST'])
def register():
    return signup.register(request, mysql, app)


@app.route('/login', methods=['POST'])
def login():
    # creates dictionary of form data
    return signin.login(request.form, mysql, app)


@app.route('/asignarRol')
def getUsers():

    return 'asignar rol admin o tarjetero'


"""
@app.route('/users')
def getUsers():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM usuario')
    user = cursor.fetchone()

    cursor.close()

    return jsonify(user)
"""

"""
@app.route('/users')
def user():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM usuario')
    user = cursor.fetchone()

    cursor.close()

    return jsonify(user)

"""
# main driver function
if __name__ == "__main__":
    app.run(debug=True)
