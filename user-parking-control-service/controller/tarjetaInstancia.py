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


def activateCard(request, mysql):
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
        'SELECT * FROM tarjeta_instancia WHERE tarjeta_instancia.finalizada = %s AND tarjeta_instancia.usuario_id = %s order by patente ASC', (finalizada, usuario_id,))
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
    return jsonify('se finalizò la tarjeta')


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
    response = make_response(
        jsonify(
            tarjeta_instancia_id
        ),
        200,
    )
    response.headers["Content-Type"] = "application/json"
    response.headers["WWW-Authenticate"] = "Eliminado!!"
    return response


def deleteFinishedCardList(patente, usuario_id, mysql):
    finalizada = "si"
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    cursor.execute(
        'DELETE FROM tarjeta_instancia WHERE tarjeta_instancia.patente = %s AND tarjeta_instancia.usuario_id = %s AND tarjeta_instancia.finalizada = %s', (patente, usuario_id, finalizada, ))
    mysql.connection.commit()
    cursor.close()

    response = make_response(
        jsonify(
            patente
        ),
        200,
    )
    response.headers["Content-Type"] = "application/json"
    response.headers["WWW-Authenticate"] = "Eliminado!!"
    return response
