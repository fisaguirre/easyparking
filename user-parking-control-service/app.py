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
from controller import tarjetaInstancia

from flask_mysqldb import MySQL
import MySQLdb.cursors
from dotenv import load_dotenv
import os
load_dotenv()

app = Flask(__name__)

obtener_conexion(app)

mysql = MySQL(app)
CORS(app)

#SECRET_KEY = 'your secret key'
SECRET_KEY = os.getenv('SECRET_KEY')


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
                'SELECT * FROM usuario WHERE usuario.public_id = %s', (data['public_id'],))
            current_user = cursor.fetchone()

            cursor.close()

        except:
            return jsonify({'message': 'token is invalid'})

        return f(current_user, *args, **kwargs)
    return decorator


@app.route('/')
def index():
    return 'Hello to Flask- This is user-parking-control-service!'


@cross_origin()
@app.route('/auth/signup', methods=['POST'])
@token_required
def register(current_user):
    return signup.register(request, mysql, app)


@cross_origin()
@app.route('/auth/login', methods=['POST'])
def login():
    return signin.login(request.form, mysql, app)


@app.route('/asignarRol/<username>/<rolAsignado>', methods=["PUT"])
@token_required
def getUsers(current_user, username, rolAsignado):
    rol.asignarRolUsuario(username, rolAsignado, mysql)
    return rol.asignarRolUsuario(username, rolAsignado, mysql)

# Obtener usuario


# Obtener varios usuarios
@app.route('/users', methods=["GET"])
@token_required
def getAllUsers(current_user):
    return users.getAllUsers(mysql)


# Obtener usuario por email
@app.route('/users/<email>', methods=["GET"])
def getUserByEmail(email):
    return users.getUserByEmail(email, mysql)


# Obtener usuarios con sus tarjetas
@app.route('/users/tarjeta', methods=["GET"])
@token_required
def getAllUsersAndCards(current_user):
    return users.getAllUsersAndCards(mysql)


# Acreditar tarjetas
@app.route('/tarjeta', methods=["POST"])
@token_required
def addCardsToUser(current_user):
    return tarjeta.addCardsToUser(request, mysql)


# Desacreditar tarjetas
@app.route('/tarjeta/<usuario_id>', methods=["PUT"])
@token_required
def discardCardsToUser(current_user, usuario_id):
    return tarjeta.discardCardsToUser(usuario_id, request, mysql)


# Count all cards from user
@app.route('/tarjetas/<usuario_id>', methods=["GET"])
@token_required
def countCardsByUserId(current_user, usuario_id):
    return tarjeta.countCardsByUserId(usuario_id, mysql)


# Activar 1 tarjeta del usuario
@app.route('/tarjeta_instancia/activar', methods=["POST"])
@token_required
def activateCard(current_user):
    tarjetaInstancia.activateCard(request, mysql)
    return 'acreditar tarjetas'


# Get amount active cards from user
@app.route('/tarjeta_instancia/cantidad/<usuarioId>', methods=["GET"])
@token_required
def getAmountCardsByUserId(current_user, usuarioId):
    return tarjetaInstancia.getAmountCardsByUserId(usuarioId, mysql)


# Obtener todas las tarjetas activas no finalizadas del usuario
@app.route('/tarjeta_instancia/activar/<usuario_id>', methods=["GET"])
@token_required
def getAllActiveCardsByUserId(current_user, usuario_id):
    return tarjetaInstancia.getAllActiveCardsByUserId(usuario_id, mysql)


# Finalizar una tarjeta por tarjeta_instancia_id
@app.route('/tarjeta_instancia/activar/<tarjeta_instancia_id>', methods=["PUT"])
@token_required
def finishCard(current_user, tarjeta_instancia_id):
    return tarjetaInstancia.finishCard(tarjeta_instancia_id, mysql)


# Get all finished cards from user
@app.route('/tarjeta_instancia/finalizar/<contar>/<usuarioId>', methods=["GET"])
@token_required
def getAllFinishedCardsByUserId(current_user, contar, usuarioId):
    return tarjetaInstancia.getAllFinishedCardsByUserId(contar, usuarioId, mysql)


# Obtener tarjetas finalizadas y acumuladas agrupadas por patente
@app.route('/tarjeta_instancia/finalizar/pendiente/<usuarioId>', methods=["GET"])
@token_required
def getAllFinishedCardListByPatente(current_user, usuarioId):
    return tarjetaInstancia.getAllFinishedCardListByPatente(usuarioId, mysql)


# Delete one finished card
@app.route('/tarjeta_instancia/finalizar/<tarjeta_instancia_id>', methods=["DELETE"])
@token_required
def deleteFinishedCard(current_user, tarjeta_instancia_id):
    return tarjetaInstancia.deleteFinishedCard(tarjeta_instancia_id, mysql)


# Eliminar varias tarjetas por usuario y por patente
@app.route('/tarjeta_instancia/finalizar/<patente>/<usuario_id>', methods=["DELETE"])
@token_required
def deleteFinishedCardList(current_user, patente, usuario_id):
    return tarjetaInstancia.deleteFinishedCardList(patente, usuario_id, mysql)


# main driver function
if __name__ == "__main__":
    app.run(debug=True)
