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


def actualizarLugares(request, usuario_id, mysql):
    cantidad_lugares = request.json['cantidadLugares']
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute(
        'UPDATE estacionamiento set cantidad_lugares = %s where estacionamiento.usuario_id = %s', (cantidad_lugares, usuario_id,))
    mysql.connection.commit()
    return jsonify('se actualizaron los lugares de la zona de trabajo')


def actualizarDisponibles(request, usuario_id, mysql):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute(
        'UPDATE estacionamiento set cantidad_disponible = %s where estacionamiento.usuario_id = %s', (request.json['cantidadDisponibles'], usuario_id,))
    mysql.connection.commit()
    return jsonify('se actualizaron los lugares disponibles')


def actualizarZona(request, usuario_id, mysql):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    finalizada = "si"
    cursor.execute(
        'UPDATE tarjeta_instancia set finalizada = %s where tarjeta_instancia.tarjeta_instancia_id = %s', (finalizada, tarjeta_instancia_id,))
    mysql.connection.commit()
    return 'se finalizò la tarjeta'


def getAllCardsByUserId(usuario_id, mysql):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    cursor.execute(
        'SELECT * FROM tarjeta_instancia WHERE tarjeta_instancia.usuario_id = %s', (usuario_id,))
    cardsActivates = cursor.fetchall()
    if cardsActivates:
        cursor.close()
        return jsonify(cardsActivates)
    else:
        amountCards = 0
        return jsonify(amountCards)


def getAmountCardsByUserId(usuario_id, mysql):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    cursor.execute(
        'SELECT COUNT(*) FROM tarjeta_instancia WHERE tarjeta_instancia.usuario_id = %s', (usuario_id,))
    cardsActivates = cursor.fetchall()
    cursor.close()

    return jsonify(cardsActivates)


def getAllActiveCardsByUserId(usuario_id, mysql):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    finalizada = "no"

    cursor.execute(
        'SELECT * FROM tarjeta_instancia WHERE tarjeta_instancia.finalizada = %s AND tarjeta_instancia.usuario_id = %s', (finalizada, usuario_id,))
    cardsActivates = cursor.fetchall()

    if cardsActivates:
        cursor.close()
        return jsonify(cardsActivates)
    else:
        amountCards = 0
        return 'no hay tarjetas activas'


def finishCard(tarjeta_instancia_id, mysql):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    finalizada = "si"
    cursor.execute(
        'UPDATE tarjeta_instancia set finalizada = %s where tarjeta_instancia.tarjeta_instancia_id = %s', (finalizada, tarjeta_instancia_id,))
    mysql.connection.commit()
    return 'se finalizò la tarjeta'


def getAllFinishedCardsByUserId(contar, usuario_id, mysql):
    finalizada = "si"
    if contar == "no":
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

        cursor.execute(
            'SELECT * FROM tarjeta_instancia WHERE tarjeta_instancia.finalizada = %s AND tarjeta_instancia.usuario_id = %s', (finalizada, usuario_id,))
        finishedCards = cursor.fetchall()

        if finishedCards:
            cursor.close()
            return jsonify(finishedCards)
        else:
            return 'no hay tarjetas pendientes por pagar'

    if contar == "si":
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute(
            'SELECT COUNT(*) AS "cantidad_tarjetas_finalizadas" FROM tarjeta_instancia WHERE tarjeta_instancia.finalizada = %s AND tarjeta_instancia.usuario_id = %s', (finalizada, usuario_id,))
        finishedCards = cursor.fetchone()

        if finishedCards:
            cursor.close()
            print(finishedCards)

            return jsonify(finishedCards)


def getAllFinishedCardListByPatente(usuario_id, mysql):
    finalizada = "si"
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    """
        cursor.execute('SELECT COUNT(tarjeta_instancia_id) AS "tarjetas_acumuladas", patente, mes, dia_semana, dia_fecha FROM tarjeta_instancia WHERE usuario_id = %s AND finalizada = %s GROUP BY patente, mes,dia_semana,dia_fecha', (usuario_id, finalizada,))
        """
    cursor.execute('SELECT COUNT(tarjeta_instancia_id) AS "tarjetas_acumuladas", patente, usuario_id FROM tarjeta_instancia WHERE usuario_id = %s AND finalizada = %s GROUP BY patente', (usuario_id, finalizada,))

    finishedCards = cursor.fetchall()

    cursor.close()
    return jsonify(finishedCards)


def deleteFinishedCard(tarjeta_instancia_id, mysql):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    cursor.execute(
        'DELETE FROM tarjeta_instancia WHERE tarjeta_instancia.tarjeta_instancia_id = %s', (tarjeta_instancia_id,))
    mysql.connection.commit()
    cursor.close()

    return 'se elimino'


def deleteFinishedCardList(patente, usuario_id, mysql):
    finalizada = "si"
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    cursor.execute(
        'DELETE FROM tarjeta_instancia WHERE tarjeta_instancia.patente = %s AND tarjeta_instancia.usuario_id = %s AND tarjeta_instancia.finalizada = %s', (patente, usuario_id, finalizada, ))
    mysql.connection.commit()
    cursor.close()

    return 'se elimino'