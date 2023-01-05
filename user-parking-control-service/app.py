# Import flask module
from flask import Flask
import re
import jwt
from functools import wraps

from database_conexion import obtener_conexion

#from flask_mysqldb import MySQL
#import MySQLdb.cursors


app = Flask(__name__)

obtener_conexion(app)

#mysql = MySQL(app)

SECRET_KEY = 'your secret key'


@app.route('/')
def index():
    # return 'Hello to Flask- This is user-parking-control-service!'
    return 'Hello to Flask!Hello tossssss dd!'


"""
@app.route('/users')
def user():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM usuario')
    user = cursor.fetchone()

    cursor.close()

    return jsonify(user)

"""
# main driver function
if __name__ == "__main__":
    app.run(debug=True)
