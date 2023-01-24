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


def getAllUsersAndCards(mysql):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    #cursor.execute('SELECT * FROM usuario INNER JOIN tarjeta WHERE usuario.usuario_id = tarjeta.usuario_id')
    cursor.execute(
        'SELECT * FROM usuario LEFT JOIN tarjeta ON usuario.usuario_id = tarjeta.usuario_id')
    current_users = cursor.fetchall()
    cursor.close()
    return jsonify(current_users)
