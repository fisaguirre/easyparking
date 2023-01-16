from model.tarjeta_instancia import TarjetaInstancia
from model.user import User
from model.tarjeta import Tarjeta
import MySQLdb

import MySQLdb.cursors

from flask_mysqldb import MySQL
from model.user import User
from flask import jsonify, make_response

from database_conexion import obtener_conexion

SECRET_KEY = 'your secret key'


def addCardsToUser(request, mysql):
    """
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cantidad_tarjetas = request.json['cardsQuantity']
    usuario_id = request.json['userId']

    card = Tarjeta("null", "null", 0, 0, "null", "null", usuario_id)

    data = (card.get_numero_serie(), card.get_fecha(), card.get_hora(
    ), card.get_minutos(), card.get_patente(), card.get_activa(), card.get_usuario_id())

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    cursor.execute(
        "insert into tarjeta values(NULL, %s, %s, %s, %s, %s, %s, %s)", data)
    mysql.connection.commit()
    cursor.close()

    """

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cantidad_tarjetas = request.json['cardsQuantity']
    usuario_id = request.json['userId']

    cursor.execute(
        'SELECT * FROM tarjeta WHERE tarjeta.usuario_id = %s', (usuario_id,))
    cardUserExists = cursor.fetchone()
    cursor.close()

    if cardUserExists:
        cardsSaved = cardUserExists['cantidad_tarjeta']
        sumaTarjeta = int(cardsSaved)+int(cantidad_tarjetas)

        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute(
            'UPDATE tarjeta set cantidad_tarjeta = %s where tarjeta.usuario_id = %s', (sumaTarjeta, usuario_id,))
        mysql.connection.commit()
        cursor.close()

    else:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        card = Tarjeta(cantidad_tarjetas, usuario_id)

        data = (card.get_cantidad_tarjeta(), card.get_usuario_id())

        cursor.execute(
            "insert into tarjeta values(NULL, %s, %s)", data)
        mysql.connection.commit()
        cursor.close()


def discardCardsToUser(usuario_id, request, mysql):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    amountDiscardCards = request.json['cardsQuantity']
    cursor.execute(
        'SELECT * FROM tarjeta WHERE tarjeta.usuario_id = %s', (usuario_id,))
    cardUserExists = cursor.fetchone()
    cursor.close()

    if cardUserExists:
        cardsSaved = cardUserExists['cantidad_tarjeta']
        restaTarjeta = int(cardsSaved)-int(amountDiscardCards)

        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute(
            'UPDATE tarjeta set cantidad_tarjeta = %s where tarjeta.usuario_id = %s', (restaTarjeta, usuario_id,))
        mysql.connection.commit()
        cursor.close()

        return jsonify(
            {"message": 'User already exists. Please Log in'}
        )

    else:
        return 'no tiene tarjetas acreditadas'


def activateCard(request, mysql):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    usuario_id = request.json['usuario_id']

    cursor.execute(
        'SELECT * FROM tarjeta WHERE tarjeta.usuario_id = %s', (usuario_id,))
    cardUserExists = cursor.fetchone()
    cursor.close()

    if cardUserExists:
        cantidad_tarjetas = cardUserExists['cantidad_tarjeta']
        cantidad_final = (int(cantidad_tarjetas))-1

        # Restar 1 tarjeta de la cantidad de tarjetas totales del usuario
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute(
            'UPDATE tarjeta set cantidad_tarjeta = %s where tarjeta.usuario_id = %s', (cantidad_final, usuario_id,))
        mysql.connection.commit()
        cursor.close()

        # Instanciar 1 tarjeta con sus respectivos datos
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        instanceCard = TarjetaInstancia(request.json['mes'], request.json['dia_semana'], request.json['dia_fecha'], request.json['hora'],
                                        request.json['minutos'], request.json['patente'], request.json['usuario_id'], request.json['tarjeta_id'])

        data = (instanceCard.get_mes(), instanceCard.get_dia_semana(), instanceCard.get_dia_fecha(), instanceCard.get_hora(
        ), instanceCard.get_minutos(), instanceCard.get_patente(), instanceCard.get_usuario_id(), instanceCard.get_tarjeta_id())

        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

        cursor.execute(
            "insert into tarjeta_instancia values(NULL,%s, %s, %s, %s, %s, %s, %s, %s)", data)
        mysql.connection.commit()
        cursor.close()


def getAllCardsByUserId(usuario_id, mysql):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    cursor.execute(
        'SELECT * FROM tarjeta_instancia WHERE tarjeta_instancia.usuario_id = %s', (usuario_id,))
    cardsActivates = cursor.fetchall()

    cursor.close()
    return jsonify(cardsActivates)


def countCardsByUserId(usuario_id, mysql):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    cursor.execute(
        'SELECT cantidad_tarjeta FROM tarjeta WHERE tarjeta.usuario_id = %s', (usuario_id,))
    cardsQuantity = cursor.fetchone()

    cursor.close()
    return jsonify(cardsQuantity)
