import json
import os
import string
import urllib.parse
import urllib.request
from flask import Flask, render_template
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from urllib.error import HTTPError, URLError
from urllib.request import urlopen, Request

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


def createPagoByUser(request, mysql):
    date_str = request.json['fecha']
    date_obj = datetime.strptime(date_str, '%a, %d %b %Y %H:%M:%S %Z')
    fecha = date_obj.strftime('%Y-%m-%d')

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    cursor.execute(
        'SELECT cuenta_mercado_id FROM cuenta_mercado WHERE usuario_id = %s', (request.json['usuario_id'],))
    userExists = cursor.fetchone()

    if userExists:
        cuenta_mercado_id = userExists.get('cuenta_mercado_id')
        print("cuenta: ", cuenta_mercado_id)
        newPayment = Pago(fecha, request.json['precio_total'], 0, 0, request.json['tiempo_total'],
                          request.json['cantidad_tarjetas'], request.json['patente'], cuenta_mercado_id, request.json['usuario_id'])

        data = (newPayment.get_fecha(), newPayment.get_precio_total(), newPayment.get_tiempo_inicio(), newPayment.get_tiempo_fin(), newPayment.get_tiempo_total(
        ), newPayment.get_cantidad_tarjetas(), newPayment.get_patente(), newPayment.get_cuenta_mercado_id(), newPayment.get_usuario_id())

        cursor.execute(
            'insert into pago values(NULL,%s,%s,%s,%s,%s,%s,%s,%s,%s)', data)
        mysql.connection.commit()
        cursor.close()
        response = make_response(
            jsonify(
                {
                    "message": "Se almacenaron las tarjetas",
                    "code": 201,

                }
            ),
            201,
        )
        response.headers["Content-Type"] = "application/json"
        response.headers["WWW-Authenticate"] = "Sign in successful"
        return response

    else:

        response = make_response(
            jsonify(
                {
                    "message": "No se pudo almacenar la tarjeta",
                    "code": 500,

                }
            ),
            500,
        )
        response.headers["Content-Type"] = "application/json"
        response.headers["WWW-Authenticate"] = "Sign in successful"
        return response


def getPagosByUser(usuario_id, mysql):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    #cursor.execute('SELECT * FROM usuario WHERE usuario.rol = "tarjetero"')
    print("user: ", usuario_id)
    cursor.execute(
        "SELECT cuenta_mercado.cuenta_mercado_id AS 'id_mercado', cuenta_mercado.username_mercado, cuenta_mercado.usuario_id AS 'us_id' , pago.* FROM cuenta_mercado LEFT JOIN pago ON pago.cuenta_mercado_id = cuenta_mercado.cuenta_mercado_id WHERE cuenta_mercado.usuario_id = %s", (usuario_id,))

    """
    cursor.execute(
        'SELECT cuenta_mercado.cuenta_mercado_id , cuenta_mercado.username_mercado, cuenta_mercado.usuario_id, pago.* FROM cuenta_mercado LEFT JOIN pago ON pago.cuenta_mercado_id = cuenta_mercado.cuenta_mercado_id WHERE cuenta_mercado.usuario_id = %s', (usuario_id,))
    """

    payments = cursor.fetchall()
    for i in range(len(payments)):
        payments[i]['fecha'] = payments[i]['fecha'].strftime(
            "%Y-%m-%d")
        payments[i]['tiempo_inicio'] = str(
            payments[i]['tiempo_inicio'])
        payments[i]['tiempo_fin'] = str(
            payments[i]['tiempo_fin'])

    print("this:", payments)

    cursor.close()
    response = make_response(
        jsonify(
            {
                "code": 201,
                "payments": payments,

            }
        ),
        201,
    )
    response.headers["Content-Type"] = "application/json"
    response.headers["WWW-Authenticate"] = "Sign in successful"
    return response
