# Import flask module
from flask import Flask, jsonify, request
import re
import jwt
from functools import wraps
from flask_cors import CORS, cross_origin


from database_conexion import obtener_conexion
from controller import estacionamiento

from flask_mysqldb import MySQL
import MySQLdb.cursors


app = Flask(__name__)

obtener_conexion(app)

mysql = MySQL(app)
CORS(app)


@app.route('/')
def index():
    return 'Hello to Flask this is parking-location-service!'

# Asigna la calle donde trabaja el tarjetero


# Crear un lugar preestablecido por tarjetero por ùnica vez - zona de trabajo
@app.route('/estacionamiento/', methods=['POST'])
def setWorkZone():
    return estacionamiento.setWorkZone(request, mysql, app)


"""
# Obtener la zona del tarjetero (latitud y longitud)
@app.route('/estacionamiento/', methods=['GET'])
def login():
    # creates dictionary of form data
    return estacionamiento.asignarLugares(request, mysql, app)


#Hacer un solo PUT apra todas las request, en el que recibe un body, request como parametros (para saber que consulta SQL
# hacer, y el ID usuario)
#app.route('/estacionamiento/<request>/<usuario_id>', methods=['PUT'])
# Cambiar la zona del tarjetero
@app.route('/estacionamiento/', methods=['PUT'])
def login():
    # creates dictionary of form data
    return estacionamiento.asignarLugares(request, mysql, app)


# Aumentar en un lugar disponible la zona del tarjetero
@app.route('/estacionamiento/', methods=['PUT'])
def login():
    # creates dictionary of form data
    return estacionamiento.asignarLugares(request, mysql, app)


# Disminuir en un lugar disponible la zona del tarjetero
@app.route('/estacionamiento/', methods=['PUT'])
def login():
    # creates dictionary of form data
    return estacionamiento.asignarLugares(request, mysql, app)

"""


# main driver function
if __name__ == "__main__":
    app.run(debug=True)
