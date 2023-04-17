import datetime
import json
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
    print(request.json)

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

        fecha = str(request.json['anio'])+'-' + \
            str(request.json['mes'])+'-'+str(request.json['dia_fecha'])
        tiempo_inicio = str(request.json['hora'])+':' + \
            str(request.json['minutos'])+':'+str(request.json['segundos'])

        hora = datetime.time(
            request.json['hora'], request.json['minutos'], request.json['segundos'])
        minutos_a_agregar = request.json['tiempo_tarjeta']
        delta = datetime.timedelta(minutes=minutos_a_agregar)
        tiempo_fin = (datetime.datetime.combine(
            datetime.date.today(), hora) + delta).time()

        instanceCard = TarjetaInstancia(
            fecha, request.json['dia_semana'], tiempo_inicio, tiempo_fin, request.json['patente'], 'no', request.json['usuario_id'], tarjeta_id)

        data = (instanceCard.get_fecha(), instanceCard.get_dia_semana(), instanceCard.get_tiempo_inicio(), instanceCard.get_tiempo_fin(
        ), instanceCard.get_patente(), instanceCard.get_finalizada(), instanceCard.get_usuario_id(), instanceCard.get_tarjeta_id())

        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

        cursor.execute(
            "insert into tarjeta_instancia values(NULL,%s, %s, %s, %s, %s, %s, %s, %s)", data)
        mysql.connection.commit()
        cursor.close()
        return jsonify('Se ha activado la tarjeta')
    else:
        return jsonify('No posee tarjetas para utilizar')


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
    # Primero se verifica si no hay tarjetas excedidas de tiempo
    lista_patentes, tarjetas_auto_finalizadas = finalizarAutomaticamente(
        usuario_id, mysql)

    # Ahora se buscan las tarjetas que no han alcanzado su tiempo limite
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    finalizada = "no"

    cursor.execute(
        'SELECT * FROM tarjeta_instancia WHERE tarjeta_instancia.finalizada = %s AND tarjeta_instancia.usuario_id = %s order by tiempo_inicio ASC', (finalizada, usuario_id,))

    cardsActivates = cursor.fetchall()

    for i in range(len(cardsActivates)):
        cardsActivates[i]['fecha'] = cardsActivates[i]['fecha'].strftime(
            "%Y-%m-%d")
        cardsActivates[i]['tiempo_inicio'] = str(
            cardsActivates[i]['tiempo_inicio'])
        cardsActivates[i]['tiempo_fin'] = str(
            cardsActivates[i]['tiempo_fin'])

    if cardsActivates:
        cursor.close()
        response = make_response(
            jsonify(
                {
                    "code": 201,
                    "finalizadas": tarjetas_auto_finalizadas,
                    "cards": cardsActivates,
                    "patentes": lista_patentes,
                }
            ),
            201,
        )
        response.headers["Content-Type"] = "application/json"
        response.headers["WWW-Authenticate"] = "Sign in successful"
        return response
    else:
        amountCards = 0
        return 'no hay tarjetas activas'


# Funcion que finaliza automaticamente las patentes que han excedido su tiempo limite
def finalizarAutomaticamente(usuario_id, mysql):
    # Primero se buscan las tarjetas excedidas y se guardan sus patentes
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    finalizada = "no"

    now = datetime.datetime.now()
    hora_actual = now.strftime("%H:%M:%S")

    cursor.execute(
        'SELECT patente FROM tarjeta_instancia WHERE usuario_id = %s AND finalizada = %s AND tiempo_fin <= %s AND fecha <= CURDATE()', (usuario_id, finalizada, hora_actual))
    patentes_fetch = cursor.fetchall()
    lista_patentes = []
    # Se recorre el dictionary del sql obtenido y se guardan las patentes en una lista
    for i in range(len(patentes_fetch)):
        lista_patentes.append(patentes_fetch[i]['patente'])

    # Ahora se finalizan esas tarjetas y luego se retorna las patentes para mostrarlas al usuario
    finalizar = "si"
    if (patentes_fetch):
        cursor.execute(
            'UPDATE tarjeta_instancia SET finalizada = %s WHERE usuario_id = %s AND tiempo_fin <= %s AND fecha <= CURDATE()', (finalizar, usuario_id, hora_actual))
        mysql.connection.commit()
        """
        cursor.execute(
            'UPDATE tarjeta_instancia SET finalizada = %s WHERE usuario_id = %s AND tiempo_fin <= CURTIME() AND fecha <= CURDATE()', (finalizar, usuario_id,))
        mysql.connection.commit()
        """
        return lista_patentes, True
    return lista_patentes, False


"""
def finishCard(tarjeta_instancia_id, request, mysql):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    finalizada = "si"
    tiempo_fin = request.json['tiempo_fin']
    cursor.execute(
        'UPDATE tarjeta_instancia set finalizada = %s, tiempo_fin = %s where tarjeta_instancia.tarjeta_instancia_id = %s', (finalizada, tiempo_fin, tarjeta_instancia_id,))
    mysql.connection.commit()
    response = make_response(
        jsonify(
            {
                "message": "se finalizò la tarjeta automaticamente",
                "code": 201,

            }
        ),
        201,
    )
    response.headers["Content-Type"] = "application/json"
    response.headers["WWW-Authenticate"] = "Sign in successful"
    return response
"""


def finishCard(tarjeta_instancia_id, request, mysql):
    print("llego")
    # hacer una query que verifique si el estado de finalizada es "si" antes de hacer un update
    antes_finalizada = 'si'
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    finalizada = "si"
    cursor.execute('SELECT COUNT(*) > 0 AS result FROM tarjeta_instancia WHERE tarjeta_instancia_id = %s AND finalizada = %s',
                   (tarjeta_instancia_id, antes_finalizada))
    verificar_finalizada = cursor.fetchone()
    print("esto es: ", verificar_finalizada['result'])
    if (int(verificar_finalizada['result']) > 0):
        print("llego 2")
        response = make_response(
            jsonify(
                {
                    "message": "se finalizò la tarjeta",
                    "code": 201,

                }
            ),
            201,
        )
        response.headers["Content-Type"] = "application/json"
        response.headers["WWW-Authenticate"] = "Sign in successful"
        return response
    else:
        try:
            print("llego 3")

            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            finalizada = "si"
            tiempo_fin = request.json['tiempo_fin']
            cursor.execute(
                'UPDATE tarjeta_instancia set finalizada = %s, tiempo_fin = %s where tarjeta_instancia.tarjeta_instancia_id = %s', (finalizada, tiempo_fin, tarjeta_instancia_id,))
            mysql.connection.commit()
            response = make_response(
                jsonify(
                    {
                        "message": "se finalizò la tarjeta",
                        "code": 201,

                    }
                ),
                201,
            )
            response.headers["Content-Type"] = "application/json"
            response.headers["WWW-Authenticate"] = "Sign in successful"
            return response
        except:
            # Si se produce un error, se cancela la transacción
            mysql.rollback()
            response = make_response(
                jsonify(
                    {
                        "message": "No se pudo finalizar la tarjeta",
                        "code": 500,

                    }
                ),
                500,
            )
            response.headers["Content-Type"] = "application/json"
            response.headers["WWW-Authenticate"] = "Sign in successful"
            return response


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

            return jsonify(finishedCards)


def getAllFinishedCardListByPatente(usuario_id, mysql):
    finalizada = "si"
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    """
        cursor.execute('SELECT COUNT(tarjeta_instancia_id) AS "tarjetas_acumuladas", patente, mes, dia_semana, dia_fecha FROM tarjeta_instancia WHERE usuario_id = %s AND finalizada = %s GROUP BY patente, mes,dia_semana,dia_fecha', (usuario_id, finalizada,))
        """
    """
    cursor.execute('SELECT COUNT(tarjeta_instancia_id) AS "tarjetas_acumuladas", patente, usuario_id FROM tarjeta_instancia WHERE usuario_id = %s AND finalizada = %s GROUP BY patente', (usuario_id, finalizada,))
    """
    # QUERY que trae Fecha-finalizada-patente-usuarrrio_id-minutos_totales-tarjetas_acumuladas
    # suma la cantidad de minutos por patente
    cursor.execute('SELECT fecha, finalizada, patente, usuario_id, SUM(TIMESTAMPDIFF(MINUTE, tiempo_inicio, tiempo_fin)) AS minutos_totales, COUNT(*) AS tarjetas_acumuladas FROM tarjeta_instancia WHERE usuario_id = %s AND finalizada = %s GROUP BY fecha, patente, finalizada, usuario_id', (usuario_id, finalizada,))

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
