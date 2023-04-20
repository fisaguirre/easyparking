# Import flask module
from flask import Flask, jsonify, request, render_template, jsonify, make_response, redirect, url_for, session
import re
import jwt
from functools import wraps
from flask_cors import CORS, cross_origin
from controller import mercado
from controller import signup
from controller import pago
from database_conexion import obtener_conexion
from controller import users

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
            print(data['public_id'])
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute(
                'SELECT * FROM usuario WHERE usuario.public_id = %s', (data['public_id'],))
            current_user = cursor.fetchone()

            cursor.close()

        except:
            return jsonify({'message': 'token is invalid'})

        return f(current_user, *args, **kwargs)
    return decorator


@cross_origin()
@app.route('/')
def index():
    return 'Hello to Flask - this is payment-service!'


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


@cross_origin()
# Guardar access token
@app.route('/pago/mercado', methods=["POST"])
@token_required
def saveAccessToken(current_user):
    return mercado.saveAccessToken(request, mysql)


# Obtener registro cuenta mercado de un usuario
@app.route('/pago/mercado/<usuario_id>', methods=["GET"])
@token_required
def getCuentaMercadoByUser(current_user, usuario_id):
    return mercado.getCuentaMercadoByUser(usuario_id, mysql)


# Obtener access token y mercado_usuario_id
@app.route('/pago/mercado/token/<usuario_id>', methods=["GET"])
@token_required
def getTokenAndMercadoId(current_user, usuario_id):
    return mercado.getTokenAndMercadoId(usuario_id, mysql)


# Verificar si existe access token
@app.route('/pago/mercado/token/exists/<usuario_id>', methods=["GET"])
@token_required
def getAccessTokenExists(current_user, usuario_id):
    return mercado.getAccessTokenExists(usuario_id, mysql)


# Verificar si el usuario tiene sucursal y caja asociada
@app.route('/pago/mercado/sucpos/<usuario_id>', methods=["GET"])
@token_required
def verifyStoreAndPosUserExists(current_user, usuario_id):
    print("hola")

    return mercado.verifyStoreAndPosUserExists(usuario_id, mysql)


# Crear nueva sucursal y guardarla
@app.route('/pago/mercado/<usuario_id>/<tipo_creacion>', methods=["PUT"])
@token_required
def saveExternalsId(current_user, usuario_id, tipo_creacion):
    if tipo_creacion == "save_store":
        return mercado.saveStore(request, usuario_id, mysql)
    if tipo_creacion == "save_pos":
        return mercado.savePos(request, usuario_id, mysql)


# Obtener todos los pagos efectuados de un usuario
@app.route('/pago/pagos/<usuario_id>', methods=["GET"])
@token_required
def getPagosByUser(current_user, usuario_id):
    return pago.getPagosByUser(usuario_id, mysql)


# Crear pago
@app.route('/pago/pagos', methods=["POST"])
@token_required
def createPagoByUser(current_user):
    return pago.createPagoByUser(request, mysql)


# main driver function
if __name__ == "__main__":
    app.run()
