# Import flask module
from flask import Flask, jsonify, request, render_template, jsonify, make_response, redirect, url_for, session
import re
import jwt
from functools import wraps
from flask_cors import CORS, cross_origin
from controller import mercado

from database_conexion import obtener_conexion

from flask_mysqldb import MySQL
import MySQLdb.cursors


app = Flask(__name__)

obtener_conexion(app)

mysql = MySQL(app)
CORS(app)


@cross_origin()
@app.route('/')
def index():
    return 'Hello to Flask - this is payment-service!'


@cross_origin()
# Guardar access token
@app.route('/pago/mercado', methods=["POST"])
def saveAccessToken():
    print(request.json)
    print("hola")

    return mercado.saveAccessToken(request, mysql)


"""

# Crear nueva sucursal y guardarla
@app.route('/pago/mercado/<usuario_id>/<tipo_creacion>', methods=["PUT"])
def createNewStore():
    return mercado.saveAccessToken(request, mysql)


# Crear nueva caja y guardarla
@app.route('/pago/pos', methods=["PUT"])
def createNewPos():
    return mercado.saveAccessToken(request, mysql)


# Crear nueva orden y devolver codigo QR
@app.route('/pago/pos', methods=["PUT"])
def createNewOrder():
    return mercado.createNewOrder(request, mysql)
"""

# Crear usuario


@app.route('/usuario', methods=["POST"])
def createUser():
    return 'hola'


# main driver function
if __name__ == "__main__":
    app.run()
