# Import flask module
from flask import Flask

app = Flask(__name__)


@app.route('/')
def index():
    return 'Hello to Flask this is parking-location-service!'


# main driver function
if __name__ == "__main__":
    app.run()
