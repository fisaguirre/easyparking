# Import flask module
from flask import Flask, jsonify, request
import re
import jwt
from functools import wraps
from flask_cors import CORS, cross_origin
from controller import signup
from controller import users

from database_conexion import obtener_conexion
from controller import estacionamiento

from flask_mysqldb import MySQL
import MySQLdb.cursors


from dotenv import load_dotenv
import os
load_dotenv()

app = Flask(__name__)

obtener_conexion(app)

mysql = MySQL(app)
CORS(app)

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
    return 'Hello to Flask this is parking-location-service!'


@cross_origin()
@app.route('/auth/signup', methods=['POST'])
@token_required
def register(current_user):
    # print(request.json)
    return signup.register(request, mysql, app)


# actualizar usuario
@app.route('/users/<tipo>/<usuario_id>', methods=["PUT"])
@token_required
def updateUser(current_user, tipo, usuario_id):
    return users.updateUser(request, tipo, usuario_id, mysql)


# Asigna la calle donde trabaja el tarjetero
@app.route('/estacionamiento/', methods=['POST'])
@token_required
def setWorkZone(current_user):
    return estacionamiento.setWorkZone(request, mysql, app)


# Obtener zonas de trabajo tarjeteros
@app.route('/estacionamiento', methods=['GET'])
def getWorkZone():
    # creates dictionary of form data
    return estacionamiento.getWorkZone(mysql)


# Obtener los lugares del estacionamiento del tarjetero
@app.route('/estacionamiento/<usuario_id>', methods=['GET'])
@token_required
def getPlaces(current_user, usuario_id):
    # creates dictionary of form data
    return estacionamiento.getPlaces(usuario_id, mysql)


# Obtener zona de trabajo de un tarjetero
@app.route('/estacionamiento/zonaTrabajo/<usuario_id>', methods=['GET'])
@token_required
def getWorkZoneByUser(current_user, usuario_id):
    # creates dictionary of form data
    return estacionamiento.getWorkZoneByUser(mysql, usuario_id)

# Cambiar la zona del tarjetero


@app.route('/estacionamiento/<tipo_update>/<usuario_id>', methods=['PUT'])
@token_required
def actualizar(current_user, tipo_update, usuario_id):
    if (tipo_update == "actualizar_lugares"):
        return estacionamiento.actualizarLugares(request, usuario_id, mysql)
    elif (tipo_update == "actualizar_disponibles"):
        return estacionamiento.actualizarDisponibles(request, usuario_id, mysql)
    elif (tipo_update == "actualizar_zona"):
        return estacionamiento.actualizarZona(request, usuario_id, mysql)


# main driver function
if __name__ == "__main__":
    app.run(debug=True)
