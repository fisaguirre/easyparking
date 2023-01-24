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

        response = make_response(
            jsonify(
                {"message": 'Se acreditaron las tarjetas'}
            ),
            200,
        )
        response.headers["Content-Type"] = "application/json"
        return response

    else:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        card = Tarjeta(cantidad_tarjetas, usuario_id)

        data = (card.get_cantidad_tarjeta(), card.get_usuario_id())

        cursor.execute(
            "insert into tarjeta values(NULL, %s, %s)", data)
        mysql.connection.commit()
        cursor.close()
        response = make_response(
            jsonify(
                {"message": 'Se acreditaron las tarjetas'}
            ),
            200,
        )
        response.headers["Content-Type"] = "application/json"
        return response


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

        response = make_response(
            jsonify(
                {"message": 'Se desacreditaron las tarjetas'}
            ),
            200,
        )
        response.headers["Content-Type"] = "application/json"
        return response

    else:
        response = make_response(
            jsonify(
                {"message": 'No tiene tarjetas acreditadas'}
            ),
            200,
        )
        response.headers["Content-Type"] = "application/json"
        return response


def countCardsByUserId(usuario_id, mysql):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    cursor.execute(
        'SELECT cantidad_tarjeta FROM tarjeta WHERE tarjeta.usuario_id = %s', (usuario_id,))
    cardsQuantity = cursor.fetchone()

    cursor.close()
    return jsonify(cardsQuantity)
