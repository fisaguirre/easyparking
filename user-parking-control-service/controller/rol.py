from model.user import User

import MySQLdb.cursors

from model.user import User
from flask import jsonify, make_response

SECRET_KEY = 'your secret key'


def asignarRolUsuario(username, rolAsignado, mysql):
    print(username)
    print(rolAsignado)

    try:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute(
            'UPDATE usuario set rol = %s where usuario.username = %s', (rolAsignado, username,))
        mysql.connection.commit()

        """
        sql = "UPDATE usuario set rol = %s where usuario.username = %s"

        input = (rolAsignado, username)
        cursor.execute(sql, input)
        mysql.connection.commit()
        """
        cursor.close()
        response = make_response(
            jsonify(
                {"message": 'Role updated'}
            ),
            201,
        )
        response.headers["Content-Type"] = "application/json"
        return response

    except mysql.connector.Error as error:
        print("Failed to update table record: {}".format(error))
        response = make_response(
            jsonify(
                {"message": 'Error al actualizar !'}
            ),
            400,
        )
        response.headers["Content-Type"] = "application/json"
        response.headers["WWW-Authenticate"] = "Error al actualizar"
        return response
