import json
from model.user import User

import MySQLdb.cursors

from model.user import User
from flask import jsonify, make_response

SECRET_KEY = 'your secret key'


def getAllUsers(mysql):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    #cursor.execute('SELECT * FROM usuario WHERE usuario.rol = "tarjetero"')
    cursor.execute('SELECT * FROM usuario WHERE usuario.rol!= "superadmin"')
    current_users = cursor.fetchall()

    cursor.close()
    return jsonify(current_users)


"""
def getUserByEmail(email, mysql):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    #cursor.execute('SELECT * FROM usuario WHERE usuario.rol = "tarjetero"')
    cursor.execute(
        'SELECT usuario_id, rol FROM usuario WHERE usuario.email = %s', (email,))
    current_user = cursor.fetchone()

    cursor.close()
    return jsonify(current_user)
"""


def getUserByEmail(email, mysql):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    #cursor.execute('SELECT * FROM usuario WHERE usuario.rol = "tarjetero"')
    cursor.execute(
        'SELECT usuario_id, rol, username FROM usuario WHERE usuario.email = %s', (email,))
    current_user = cursor.fetchone()
    print("esto es: ", current_user)

    cursor.close()
    return jsonify(current_user)


def getAllUsersAndCards(mysql):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    #cursor.execute('SELECT * FROM usuario INNER JOIN tarjeta WHERE usuario.usuario_id = tarjeta.usuario_id')
    cursor.execute(
        'SELECT * FROM usuario LEFT JOIN tarjeta ON usuario.usuario_id = tarjeta.usuario_id')
    current_users = cursor.fetchall()
    cursor.close()
    return jsonify(current_users)


def updateUser(request, tipo, usuario_id, mysql):
    user_update = request.json
    print("hola")

    if (tipo == 'cambiar_rol'):
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute(
            'UPDATE usuario set rol = %s where usuario.usuario_id = %s', (user_update.get('rol'), usuario_id,))
        mysql.connection.commit()
        cursor.close()

        response = make_response(
            jsonify(
                {"message": 'Se actualizò el rol del usuario'},
                {"code": 201}
            ),
            201,
        )
        response.headers["Content-Type"] = "application/json"
        response.headers["WWW-Authenticate"] = "User already exists!!"
        return response
