# Import flask module
from flask import Flask

app = Flask(__name__)


@app.route('/')
def index():
    return 'Hello to Flask- This is user-parking-control-service!'


# main driver function
if __name__ == "__main__":
    app.run()
