import pymysql


def obtener_conexion(app):
    app.config['SECRET_KEY'] = 'your secret key'
    app.config['MYSQL_HOST'] = 'db_parking_location_service'
    app.config['MYSQL_USER'] = 'root'
    app.config['MYSQL_PASSWORD'] = 'Fernandoroot2023.'
    app.config['MYSQL_DB'] = 'parkinglocation'
