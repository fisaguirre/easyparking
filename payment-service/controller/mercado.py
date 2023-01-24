import json
import os
import string
import urllib.parse
import urllib.request
from flask import Flask, render_template
from werkzeug.security import generate_password_hash, check_password_hash

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


def saveAccessToken(request, mysql):

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    cursor.execute(
        'SELECT * FROM cuenta_mercado WHERE usuario_id = %s', (request.json['usuario_id'],))
    userExists = cursor.fetchall()

    if userExists:
        access_token = request.json['access_token']
        split_access_token = request.json['access_token'].split('-')
        mercado_usuario_id = split_access_token[-1]

        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute(
            'UPDATE cuenta_mercado set access_token = %s, mercado_usuario_id = %s WHERE usuario_id = %s', (access_token, mercado_usuario_id, request.json['usuario_id'],))
        mysql.connection.commit()
        cursor.close()

        return jsonify('Access token guardado')

    else:
        split_access_token = request.json['access_token'].split('-')
        mercado_usuario_id = split_access_token[-1]

        mercado = Mercado(
            request.json['access_token'], mercado_usuario_id, 0, 0, 0, 0, request.json['usuario_id'])

        data = (mercado.get_access_token(), mercado.get_mercado_usuario_id(), mercado.get_store_id(
        ), mercado.get_external_store_id(), mercado.get_pos_id(), mercado.get_external_pos_id(), mercado.get_usuario_id())

        cursor.execute(
            "insert into cuenta_mercado values(NULL,%s, %s, %s, %s, %s, %s, %s)", data)
        mysql.connection.commit()
        cursor.close()
        return jsonify('access token guardado')


def getCuentaMercadoByUser(usuario_id, mysql):

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    cursor.execute(
        'SELECT * FROM cuenta_mercado WHERE usuario_id = %s', (usuario_id,))
    tokenMercadoUsuarioId = cursor.fetchone()

    if tokenMercadoUsuarioId:
        cursor.close()
        return jsonify(tokenMercadoUsuarioId)

    else:
        cursor.close()
        return jsonify('El usuario tarjtero no tiene un access token almacenado')


def getAccessTokenExists(usuario_id, mysql):

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute(
        'SELECT access_token FROM cuenta_mercado WHERE usuario_id = %s', (usuario_id,))
    tokenMercadoUsuarioId = cursor.fetchall()

    if tokenMercadoUsuarioId:
        cursor.close()
        return jsonify('existe')

    else:
        cursor.close()
        return jsonify('no existe')


def verifyStoreAndPosUserExists(usuario_id, mysql):
    print("asd")
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute(
        'SELECT external_pos_id FROM cuenta_mercado WHERE usuario_id = %s', (usuario_id,))
    sucPosMercado = cursor.fetchone()

    if (len(sucPosMercado['external_pos_id']) > 1):
        cursor.close()
        return jsonify('existe')
    else:
        cursor.close()
        return jsonify('no existe')


def getTokenAndMercadoId(usuario_id, mysql):

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    cursor.execute(
        'SELECT access_token, mercado_usuario_id FROM cuenta_mercado WHERE usuario_id = %s', (usuario_id,))
    tokenMercadoUsuarioId = cursor.fetchone()

    if tokenMercadoUsuarioId:
        cursor.close()
        return jsonify(tokenMercadoUsuarioId)

    else:
        cursor.close()
        return jsonify('El usuario tarjtero no tiene un access token almacenado')


def saveStore(request, usuario_id, mysql):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    cursor.execute(
        'UPDATE cuenta_mercado set store_id = %s, external_store_id = %s WHERE usuario_id = %s', (request.json['store_id'], request.json['external_store_id'], usuario_id,))
    mysql.connection.commit()
    cursor.close()

    return jsonify('Store id guardado')


def savePos(request, usuario_id, mysql):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    cursor.execute(
        'UPDATE cuenta_mercado set pos_id = %s, external_pos_id = %s WHERE usuario_id = %s', (request.json['pos_id'], request.json['external_pos_id'], usuario_id,))
    mysql.connection.commit()
    cursor.close()

    return jsonify('Pos id guardado')
