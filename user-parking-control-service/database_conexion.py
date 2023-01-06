import pymysql
"""
def obtener_conexion():
    return pymysql.connect(host='db',
                                user='root',
                                password='root',
                                port = 3306,
                                db='podcast')
"""
"""
def obtener_conexion():
    return pymysql.connect(host='localhost',
                                user='fprueba',
                                password='Fernandoroot2022.',
                                port = 3306,
                                db='podcast')
"""


def obtener_conexion(app):
    app.config['SECRET_KEY'] = 'your secret key'
    app.config['MYSQL_HOST'] = 'localhost'
    app.config['MYSQL_USER'] = 'root'
    app.config['MYSQL_PASSWORD'] = 'Fernandoroot2023.'
    app.config['MYSQL_DB'] = 'userparkingcontrol'
