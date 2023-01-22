# Import flask module
from flask import Flask, jsonify, request
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


@app.route('/')
def index():
    return 'Hello to Flask - this is payment-service!'


# Crear orden de pago dinàmico para obtener QR
@app.route('/tarjeta', methods=["POST"])
def ordenDePagoQR():
    mercado.ordenDePagoQR(request, mysql)
    return 'acreditar tarjetas'


@app.route('/prueba', methods=["POST"])
def prueba():
    print(request.json)
    return 'acreditar tarjetas'


# main driver function
if __name__ == "__main__":
    app.run()
