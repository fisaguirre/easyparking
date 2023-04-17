from model.user import User
from model.estacionamiento import Estacionamiento
import MySQLdb

import MySQLdb.cursors

from flask_mysqldb import MySQL
from flask import jsonify, make_response

from database_conexion import obtener_conexion

SECRET_KEY = 'your secret key'


def setWorkZone(request, mysql, app):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    usuario_id = request.json['usuario_id']
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    cursor.execute(
        'SELECT * FROM estacionamiento WHERE usuario_id = %s', (usuario_id,))
    estacionamiento = cursor.fetchone()

    if estacionamiento:
        cursor.execute(
            'UPDATE estacionamiento set latitud = %s, longitud = %s, calle = %s WHERE estacionamiento.usuario_id = %s', (request.json['latitud'], request.json['longitud'], request.json['calle'], usuario_id,))
        mysql.connection.commit()
        cursor.close()
        response = make_response(
            jsonify(
                {"message": 'Se ha guardado la zona de trabajo en la calle: !'},
                {"code": 201}
            ),
            201,
        )
        response.headers["Content-Type"] = "application/json"
        return response

    else:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        usuario_id = request.json['usuario_id']
        #estacionamiento_id, latitud, longitud, calle, cantidad_lugares, cantidad_disponible, usuario_i

        estacionamiento = Estacionamiento(
            request.json['latitud'], request.json['longitud'], request.json['calle'], 0, 0, request.json['usuario_id'])

        data = (estacionamiento.get_latitud(), estacionamiento.get_longitud(), estacionamiento.get_calle(), estacionamiento.get_cantidad_lugares(
        ), estacionamiento.get_cantidad_disponible(), estacionamiento.get_usuario_id())

        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

        cursor.execute(
            "insert into estacionamiento values(NULL,%s, %s, %s, %s, %s, %s)", data)
        mysql.connection.commit()
        cursor.close()
        response = make_response(
            jsonify(
                {"message": 'Se ha guardado la zona de trabajo en la calle: !'},
                {"code": 201}
            ),
            201,
        )
        response.headers["Content-Type"] = "application/json"
        return response


def actualizarLugares(request, usuario_id, mysql):
    cantidad_lugares = request.json['cantidadLugares']
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute(
        'UPDATE estacionamiento set cantidad_lugares = %s where estacionamiento.usuario_id = %s', (cantidad_lugares, usuario_id,))
    mysql.connection.commit()
    cursor.close()
    response = make_response(
        jsonify(
            {"message": 'se actualizaron los lugares de la zona de trabajo: !'},
            {"code": 201}
        ),
        201,
    )
    response.headers["Content-Type"] = "application/json"
    return response


def actualizarDisponibles(request, usuario_id, mysql):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute(
        'UPDATE estacionamiento set cantidad_disponible = %s where estacionamiento.usuario_id = %s', (request.json['cantidadDisponibles'], usuario_id,))
    mysql.connection.commit()
    cursor.close()
    response = make_response(
        jsonify(
            {"message": 'se actualizaron los lugares disponibles!'},
            {"code": 201}
        ),
        201,
    )
    response.headers["Content-Type"] = "application/json"
    return response


def getWorkZone(mysql):

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    zero = 0
    cursor.execute(
        'SELECT * FROM estacionamiento WHERE estacionamiento.latitud != %s AND estacionamiento.longitud != %s', (zero, zero,))
    estacionamientos = cursor.fetchall()
    cursor.close()
    return jsonify(estacionamientos)


def getWorkZoneByUser(mysql, usuario_id):

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    zero = 0

    cursor.execute(
        'SELECT latitud, longitud, calle FROM estacionamiento WHERE usuario_id = %s', (usuario_id,))
    # si se quiere ver el marker del usuario tarjetero que esta logueado hay que usar la de abajo, pero hay que hacer un condicional porque la query de arriba se usa para crear sucursal mercado pago
    """
    cursor.execute(
        'SELECT latitud, longitud FROM estacionamiento WHERE usuario_id = %s', (usuario_id,))
    """
    workZoneByUser = cursor.fetchone()
    cursor.close()
    return jsonify(workZoneByUser)


def getPlaces(usuario_id, mysql):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute(
        'SELECT cantidad_lugares, cantidad_disponible FROM estacionamiento WHERE estacionamiento.usuario_id = %s', (usuario_id,))
    lugares = cursor.fetchone()
    cursor.close()
    return jsonify(lugares)


def actualizarZona(request, usuario_id, mysql):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    finalizada = "si"
    cursor.execute(
        'UPDATE tarjeta_instancia set finalizada = %s where tarjeta_instancia.tarjeta_instancia_id = %s', (finalizada, tarjeta_instancia_id,))
    mysql.connection.commit()
    cursor.close()
    return 'se finalizò la tarjeta'
