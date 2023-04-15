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
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    finalizada = "no"
    cursor.execute(
        'SELECT * FROM tarjeta_instancia WHERE tarjeta_instancia.finalizada = %s AND tarjeta_instancia.usuario_id = %s order by tiempo_inicio ASC', (finalizada, usuario_id,))

    cardsActivates = cursor.fetchall()
    print("antes: ", cardsActivates)
    resultados_strings = []
    """
    resultados_strings = []
    for i in range(len(cardsActivates)):
        a = cardsActivates[i]['fecha'].strftime("%Y-%m-%d")
        cardsActivates[i]['fecha'] = a
        b = str(cardsActivates[i]['tiempo_inicio'])
        cardsActivates[i]['tiempo_inicio'] = b
        c = str(cardsActivates[i]['tiempo_fin'])
        cardsActivates[i]['tiempo_fin'] = c
    """

    for i in range(len(cardsActivates)):
        tarjeta_instancia_id = cardsActivates[i]['tarjeta_instancia_id']
        dia_semana = cardsActivates[i]['dia_semana']
        patente = cardsActivates[i]['patente']
        finalizada = cardsActivates[i]['finalizada']
        usuario_id = cardsActivates[i]['usuario_id']
        tarjeta_id = cardsActivates[i]['tarjeta_id']
        fecha = cardsActivates[i]['fecha'].strftime("%Y-%m-%d")
        tiempo_inicio = str(cardsActivates[i]['tiempo_inicio'])
        tiempo_fin = str(cardsActivates[i]['tiempo_fin'])
        resultados_strings.append((tarjeta_instancia_id, fecha, dia_semana,
                                  tiempo_inicio, tiempo_fin, patente, finalizada, usuario_id, tarjeta_id))
    print("quedo: ", resultados_strings)
    # Imprimir los resultados en formato string
    for resultado_str in resultados_strings:
        print("estos son: ", resultado_str)

    datitos = json.dumps(resultados_strings)
    print("Ahora: ", datitos)
    if cardsActivates:
        cursor.close()
        return jsonify(datitos)
    else:
        amountCards = 0
        return 'no hay tarjetas activas'


def prueba(mysql, app):
    print("hola")

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    """
    cursor.execute(
        'SELECT * FROM tiempo_fecha WHERE fecha_final > fecha_inicial')
    cardsActivates = cursor.fetchall()
    print("despues")
    print(cardsActivates[0]['fecha_inicial'])
    print(type(cardsActivates[0]['fecha_inicial']))
    print((cardsActivates[0]['fecha_inicial']).split())
    a = ((cardsActivates[0]['fecha_inicial']).split())[0]
    print(a)
    fecha_hora = datetime.now()
    print("si: ", fecha_hora)
    """
    nuevo = "2023-04-15 07:10:59"

    fecha_hora_str = "15/04/2023 10:30:00"
    formato = "%Y-%m-%d %H:%M:%S"
    fecha_hora2 = datetime.strptime(nuevo, formato)

    print("nueva fecha: ", fecha_hora2)
    print("adasdas")

    fecha_inicio = "2023-06-15"
    hora_inicio = "15:05:14"
    hora_fin = "15:35:14"

    data = ('fer', fecha_inicio, hora_inicio, hora_fin)

    cursor.execute(
        "insert into tiempo_fecha values(NULL,%s,%s, %s,%s)", data)

    mysql.connection.commit()

    # return jsonify(a)
    return 'hola'


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
