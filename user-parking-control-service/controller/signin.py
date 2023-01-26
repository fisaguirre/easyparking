from datetime import timedelta
from datetime import datetime, date, timedelta
from flask import jsonify, request

import re
import uuid  # for public id
from werkzeug.security import generate_password_hash, check_password_hash
# imports for PyJWT authentication
import jwt
from functools import wraps

from database_conexion import obtener_conexion
from model.user import User

from flask_mysqldb import MySQL
import MySQLdb.cursors


from model.user import User
import MySQLdb
from flask import make_response

from flask import request, jsonify
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

SECRET_KEY = 'your secret key'

"""
def login(auth, mysql, app):
    email = request.json['email']
    password = request.json['password']
    #access_token = create_access_token(identity=email)
    # return jsonify(access_token=access_token)
    return 'hola'
"""


def login(auth, mysql, app):
    if not request.json['password'] or not request.json['email']:
        print("hola")
        # if not auth.get('username') or not auth.get('email') or not auth.get('password'):
        # returns 401 if any email or / and password is missing
        response = make_response(
            jsonify(
                {"message": 'Ingrese email y password'}
            ),
            401,
        )

        response.headers["Content-Type"] = "application/json"
        response.headers["WWW-Authenticate"] = "Login required!!"
        return response

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute(
        'SELECT * FROM usuario WHERE usuario.email = %s', (request.json['email'],))
    user = cursor.fetchone()

    new_user = User(user['public_id'],  user['username'], user['password'], user['nombre'],
                    user['apellido'], user['email'], user['rol'])

    if not user:
        # returns 401 if user does not exist
        response = make_response(
            jsonify(
                {"message": 'User doesnt exist with that email'}
            ),
            401,
        )
        response.headers["Content-Type"] = "application/json"
        response.headers["WWW-Authenticate"] = "User does not exist !!"
        return response

    # if check_password_hash(generate_password_hash(new_user.get_password()), auth.get('password')):
    # compare whether is the database password is equal to the entered
    if check_password_hash(new_user.get_password(), request.json['password']):
        print("si")

        token = jwt.encode({'public_id': new_user.get_public_id(), 'exp': datetime.utcnow(
        ) + timedelta(minutes=45)}, app.config['SECRET_KEY'], "HS256")

        response = make_response(
            jsonify(
                {
                    "message": 'Sign in successful',
                    "token": token
                }
            ),
            201,
        )
        response.headers["Content-Type"] = "application/json"
        response.headers["WWW-Authenticate"] = "Sign in successful"
        return response

    # returns 403 if password is wrong
    response = make_response(
        jsonify(
            {"message": 'Password is wrong'}
        ),
        401,
    )
    response.headers["Content-Type"] = "application/json"
    response.headers["WWW-Authenticate"] = "Wrong Password!!"
    return response
