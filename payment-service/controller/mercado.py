import json
import os
from flask import Flask, render_template
import urllib.request
from werkzeug.security import generate_password_hash, check_password_hash

from model.user import User
from model.pago import Pago
from model.mercado import Mercado
import MySQLdb

import MySQLdb.cursors

from flask_mysqldb import MySQL
from model.user import User
from flask import jsonify, make_response, request

from database_conexion import obtener_conexion

SECRET_KEY = 'your secret key'


def saveAccessToken(request, mysql):

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    cursor.execute(
        'SELECT * FROM cuenta_mercado WHERE usuario_id = %s', (request.json['usuario_id'],))
    userExists = cursor.fetchall()

    if userExists:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        hashToken = generate_password_hash(request.json['access_token'])
        cursor.execute(
            'UPDATE cuenta_mercado set access_token = %s where usuario_id = %s', (hashToken, request.json['usuario_id'],))
        mysql.connection.commit()
        cursor.close()

        return jsonify('Access token guardado')

    else:
        hashToken = generate_password_hash(request.json['access_token'])

        mercado = Mercado(
            hashToken, 0, 0, 0, 0, 0, request.json['usuario_id'])

        data = (mercado.get_access_token(), mercado.get_mercado_usuario_id(), mercado.get_store_id(
        ), mercado.get_external_store_id(), mercado.get_pos_id(), mercado.get_external_pos_id(), mercado.get_usuario_id())

        cursor.execute(
            "insert into cuenta_mercado values(NULL,%s, %s, %s, %s, %s, %s, %s)", data)
        mysql.connection.commit()
        cursor.close()
        return jsonify('access token guardado')


def pagar():
    """
    url = "https://api.mercadopago.com/merchant_orders/search?access_token=TEST-7697609830214286-012119-9b1bcadb1aa4275a4c12f087e86f7717-1292570557".format(
        os.environ.get("TMDB_API_KEY"))
    """
    url = "https://api.mercadopago.com/users/1292570557/stores/search?access_token=TEST-7697609830214286-012119-9b1bcadb1aa4275a4c12f087e86f7717-1292570557"

    response = urllib.request.urlopen(url)
    data = response.read()
    dict = json.loads(data)
    print(dict)
    return jsonify(dict)


def ordenDePagoQR(request, mysql):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    usuario_id = request.json['usuario_id']

    cursor.execute(
        'SELECT * FROM tarjeta WHERE tarjeta.usuario_id = %s', (usuario_id,))
    cardUserExists = cursor.fetchone()
    cursor.close()

    if cardUserExists:

        cantidad_tarjetas = cardUserExists['cantidad_tarjeta']
        tarjeta_id = cardUserExists['tarjeta_id']
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
                                        request.json['minutos'], request.json['patente'], "no", request.json['usuario_id'], tarjeta_id)

        data = (instanceCard.get_mes(), instanceCard.get_dia_semana(), instanceCard.get_dia_fecha(), instanceCard.get_hora(
        ), instanceCard.get_minutos(), instanceCard.get_patente(), instanceCard.get_finalizada(), instanceCard.get_usuario_id(), instanceCard.get_tarjeta_id())

        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

        cursor.execute(
            "insert into tarjeta_instancia values(NULL,%s, %s, %s, %s, %s, %s, %s, %s, %s)", data)
        mysql.connection.commit()
        cursor.close()


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
