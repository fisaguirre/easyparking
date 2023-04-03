from model.user import User

import MySQLdb.cursors

from model.user import User
from flask import jsonify, make_response


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
