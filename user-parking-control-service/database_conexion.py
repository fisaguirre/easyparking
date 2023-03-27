import pymysql
from dotenv import load_dotenv
import os
load_dotenv()


def obtener_conexion(app):
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config['MYSQL_HOST'] = os.getenv('MYSQL_HOST')
    app.config['MYSQL_USER'] = os.getenv('MYSQL_USER')
    app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD')
    app.config['MYSQL_DB'] = os.getenv('MYSQL_DB')
