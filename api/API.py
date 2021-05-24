import mysql.connector
import flask
from flask import request, jsonify

# All API endpoints (Otherwise known as routes) are a set of functions that will perform some behaviour, and return a
# response. The way that flask works is it creates an indefinitely running application that allows any function marked
# with @app.route() to be called through a URL. To Deploy the API, log into the server, navigate to the /var/www/api
# folder and copy and paste this file into there. To run it simply enter `python3 API.py`

# Create a connection to the database and a cursor that we use to perform database operations
connection = mysql.connector.connect(
    host="127.0.0.1",
    user="TheBeast",
    password="WeLoveCOP4331",
    database="COP4331"
)
cursor = connection.cursor()

# the string inside @api.route() is what will come after `165.227.185.106:5000` in the url
api = flask.Flask(__name__)


# A test api endpoint to get you started
@api.route('/')
def home():
    return "You're on the home page"


# Start the API
api.run(host='0.0.0.0')