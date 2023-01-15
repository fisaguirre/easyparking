# Import flask module
from flask import Flask, jsonify, request
import re
import jwt
from functools import wraps
from flask_cors import CORS, cross_origin


from database_conexion import obtener_conexion
from controller import signup
from controller import signin
from controller import rol
from controller import users
from controller import tarjeta

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
CORS(app)

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


@cross_origin()
@app.route('/signup', methods=['POST'])
def register():
    # print(request.json)
    return signup.register(request, mysql, app)


@app.route('/login', methods=['POST'])
def login():
    # creates dictionary of form data
    return signin.login(request.form, mysql, app)


@app.route('/asignarRol/<username>/<rolAsignado>', methods=["PUT"])
def getUsers(username, rolAsignado):
    rol.asignarRolUsuario(username, rolAsignado, mysql)
    return rol.asignarRolUsuario(username, rolAsignado, mysql)

# Obtener usuario


# Obtener varios usuarios
@app.route('/users', methods=["GET"])
def getAllUsers():
    return users.getAllUsers(mysql)


# Acreditar tarjetas
@app.route('/tarjeta', methods=["POST"])
def addCards():
    tarjeta.addCardsToUser(request, mysql)
    return 'acreditar tarjetas'


# Activar 1 tarjeta
@app.route('/tarjeta/activar', methods=["POST"])
def activateCard():
    tarjeta.activateCard(request, mysql)
    return 'acreditar tarjetas'


# Get all card from user
@app.route('/tarjetas/<usuarioId>', methods=["GET"])
def getAllCardsByUserId(usuarioId):
    print("esto:", usuarioId)

    return tarjeta.getAllCardsByUserId(usuarioId, mysql)


"""

@app.route('/user', methods=["GET"])
def getUsers(username, rolAsignado):
    rol.asignarRolUsuario(username, rolAsignado, mysql)
    return rol.asignarRolUsuario(username, rolAsignado, mysql)

# Eliminar usuario
@app.route('/users', methods=["DELETE"])
def getUsers(username, rolAsignado):
    rol.asignarRolUsuario(username, rolAsignado, mysql)
    return rol.asignarRolUsuario(username, rolAsignado, mysql)


# Crear tarjeta
@app.route('/tarjeta', methods=["POST"])
def getUsers(username, rolAsignado):
    rol.asignarRolUsuario(username, rolAsignado, mysql)
    return rol.asignarRolUsuario(username, rolAsignado, mysql)

# Get tarjeta


@app.route('/tarjeta', methods=["GET"])
def getUsers(username, rolAsignado):
    rol.asignarRolUsuario(username, rolAsignado, mysql)
    return rol.asignarRolUsuario(username, rolAsignado, mysql)

# Get tarjetas


@app.route('/tarjetas', methods=["GET"])
def getUsers(username, rolAsignado):
    rol.asignarRolUsuario(username, rolAsignado, mysql)
    return rol.asignarRolUsuario(username, rolAsignado, mysql)


# ACtualizar tarjeta
@app.route('/users', methods=["UPDATE"])
def getUsers(username, rolAsignado):
    rol.asignarRolUsuario(username, rolAsignado, mysql)
    return rol.asignarRolUsuario(username, rolAsignado, mysql)


# Eliminar tarjeta
@app.route('/tarjeta', methods=["DELETE"])
def getUsers(username, rolAsignado):
    rol.asignarRolUsuario(username, rolAsignado, mysql)
    return rol.asignarRolUsuario(username, rolAsignado, mysql)
"""

# main driver function
if __name__ == "__main__":
    app.run(debug=True)
