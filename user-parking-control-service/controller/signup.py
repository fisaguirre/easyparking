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


def register(request, mysql, app):
    if request.method == 'POST' and request.json['username'] and request.json['password'] and request.json['email']:
        user_signup_data = request.json

        new_password = generate_password_hash(user_signup_data.get('password'))
        new_uuid = str(uuid.uuid4())

        new_user = User(new_uuid, user_signup_data.get('username'),  new_password,
                        user_signup_data.get('name'), user_signup_data.get('lastname'), user_signup_data.get('email'), user_signup_data.get('dni'), user_signup_data.get('rol'))

        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

        cursor.execute(
            'SELECT * FROM usuario WHERE usuario.username = %s', (new_user.get_username(),))
        user_exists = cursor.fetchone()
        cursor.close()

        if user_exists:
            # returns 202 if user already exists
            response = make_response(
                jsonify(
                    {"message": 'User already exists. Please Log in'},
                    {"code": 202}
                ),
                202,
            )
            response.headers["Content-Type"] = "application/json"
            response.headers["WWW-Authenticate"] = "User already exists!!"
            return response
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute(
            'SELECT * FROM usuario WHERE usuario.email = %s', (new_user.get_email(),))
        email_exists = cursor.fetchone()
        cursor.close()
        if email_exists:
            # returns 202 if user already exists
            response = make_response(
                jsonify(
                    {"message": 'User with that email already exists. Please Log in'},
                    {"code": 202}
                ),
                202,
            )
            response.headers["Content-Type"] = "application/json"
            response.headers["WWW-Authenticate"] = "User already exists!!"
            return response
        elif not re.match(r'[^@]+@[^@]+\.[^@]+', user_signup_data.get('email')):
            response = make_response(
                jsonify(
                    {"message": 'Invalid email address !'},
                    {"message": 400}
                ),
                400,
            )
            response.headers["Content-Type"] = "application/json"
            response.headers["WWW-Authenticate"] = "Invalid email address !"
            return response
        elif not re.match(r'[A-Za-z0-9]+', user_signup_data.get('username')):
            response = make_response(
                jsonify(
                    {"message": 'Username must contain only characters and numbers !'},
                    {"code": 400}
                ),
                400,
            )
            response.headers["Content-Type"] = "application/json"
            response.headers["WWW-Authenticate"] = "Username must contain only characters and numbers !"
            return response
        # signup new User with user rol
        else:
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

            data = (new_user.get_public_id(),
                    new_user.get_username(), new_user.get_password(
            ), new_user.get_nombre(), new_user.get_apellido(),
                new_user.get_email(), new_user.get_dni(), new_user.get_rol())

            cursor.execute(
                "insert into usuario values(NULL, %s, %s, %s, %s, %s, %s, %s, %s)", data)
            mysql.connection.commit()
            cursor.close()

            response = make_response(
                jsonify(
                    {"message": "Se registro el usuario"},
                    {"code": 201},
                    {"uuid": new_uuid}
                ),
                201,
            )
            response.headers["Content-Type"] = "application/json"
            return response
    elif request.method == 'POST':
        response = make_response(
            jsonify(
                {"message": 'Please fill out the form !'},
                {"code": 201}
            ),
            201,
        )
        response.headers["Content-Type"] = "application/json"
        response.headers["WWW-Authenticate"] = "Please fill out the form !"
        return response
