# Import flask module
from flask import Flask, jsonify, request
import re
import jwt
from functools import wraps
from controller import zone

from database_conexion import obtener_conexion
from controller import signup
from controller import signin
from controller import rol

from flask_mysqldb import MySQL
import MySQLdb.cursors


app = Flask(__name__)

obtener_conexion(app)

mysql = MySQL(app)


@app.route('/')
def index():
    return 'Hello to Flask this is parking-location-service!'

# Asigna la calle donde trabaja el tarjetero


@app.route('/estacionamiento/asignarZona', methods=["POST"])
def setWorkZone():
    return zone.setWorkZone(request.form, mysql, app)


# main driver function
if __name__ == "__main__":
    app.run(debug=True)
