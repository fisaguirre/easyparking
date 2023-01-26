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
            'UPDATE estacionamiento set latitud = %s, longitud = %s WHERE estacionamiento.usuario_id = %s', (request.json['latitud'], request.json['longitud'], usuario_id,))
        mysql.connection.commit()
        cursor.close()
        return jsonify('Se ha guardado la zona de trabajo en la calle: ')

    else:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        usuario_id = request.json['usuario_id']
        #estacionamiento_id, latitud, longitud, calle, cantidad_lugares, cantidad_disponible, usuario_i

        estacionamiento = Estacionamiento(
            request.json['latitud'], request.json['longitud'], "NULL", 0, 0, request.json['usuario_id'])

        data = (estacionamiento.get_latitud(), estacionamiento.get_longitud(), estacionamiento.get_calle(), estacionamiento.get_cantidad_lugares(
        ), estacionamiento.get_cantidad_disponible(), estacionamiento.get_usuario_id())

        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

        cursor.execute(
            "insert into estacionamiento values(NULL,%s, %s, %s, %s, %s, %s)", data)
        mysql.connection.commit()
        cursor.close()
        return jsonify('Se ha guardado la zona de trabajo en la calle: ')


def actualizarLugares(request, usuario_id, mysql):
    cantidad_lugares = request.json['cantidadLugares']
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute(
        'UPDATE estacionamiento set cantidad_lugares = %s where estacionamiento.usuario_id = %s', (cantidad_lugares, usuario_id,))
    mysql.connection.commit()
    cursor.close()
    return jsonify('se actualizaron los lugares de la zona de trabajo')


def actualizarDisponibles(request, usuario_id, mysql):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute(
        'UPDATE estacionamiento set cantidad_disponible = %s where estacionamiento.usuario_id = %s', (request.json['cantidadDisponibles'], usuario_id,))
    mysql.connection.commit()
    cursor.close()
    return jsonify('se actualizaron los lugares disponibles')


def getWorkZone(mysql):

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    zero = 0
    cursor.execute(
        'SELECT * FROM estacionamiento WHERE estacionamiento.latitud != %s AND estacionamiento.longitud != %s', (zero, zero,))
    estacionamientos = cursor.fetchall()
    cursor.close()
    return jsonify(estacionamientos)


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
