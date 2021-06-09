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


def unpack_results(stored_results):
    results = []
    for result in stored_results:
        results = results + result.fetchall()
    return results


@api.route('/api/ping')
def ping():
    return jsonify({"response": {"code": 200, "message": "Ping!"}})


@api.route('/api/login/<usr>/<pwd>')
def login(usr, pwd):
    try:
        cursor.callproc('Login', (usr, pwd))
        results = unpack_results(cursor.stored_results())
        connection.commit()
        response = {}
        if len(results) == 0:
            response.update({"response": {"code": 401, "message": "Failed login with credentials"}})
        else:
            user = results[0]
            response.update({"response": {"code": 200, "message": "Login success", "data": [user[0], user[3], user[4]]}})
        return jsonify(response)
    except Exception as ex:
        print(ex)
        return jsonify({"response": {"code": 404, "message": "Database connection failed"}})


@api.route('/api/register/<fname>/<lname>/<usr>/<pwd>')
def register(fname, lname, usr, pwd):
    try:
        cursor.callproc('Register', (fname, lname, usr, pwd))
        results = unpack_results(cursor.stored_results())
        connection.commit()
        response = {}
        if len(results) == 0:
            response.update({"response": {"code": 401, "message": "User already exists"}})
        else:
            response.update({"response": {"code": 200, "message": "Register success"}})
        return jsonify(response)
    except Exception as ex:
        print(ex)
        return jsonify({"response": {"code": 404, "message": "Database connection failed"}})


@api.route('/api/deleteuser/<userid>')
def deleteuser(userid):
    try:
        cursor.callproc('DeleteUser', (userid))
        unpack_results(cursor.stored_results())
        connection.commit()
        return jsonify({"response": {"code": 200, "message": "User successfully deleted"}})
    except Exception as ex:
        print(ex)
        return jsonify({"response": {"code": 404, "message": "Database connection failed"}})


@api.route('/api/addcontact/<fname>/<lname>/<phonenum>/<emailadd>/<userid>')
def addcontact(fname, lname, phonenum, emailadd, userid):
    try:
        cursor.callproc('AddContact', (fname, lname, phonenum, emailadd, userid))
        results = unpack_results(cursor.stored_results())
        connection.commit()
        response = {}
        if len(results) == 0:
            response.update({"response": {"code": 401, "message": "Contact already exists"}})
        else:
            response.update({"response": {"code": 200, "message": "Contact add success"}})
        return jsonify(response)
    except Exception as ex:
        print(ex)
        return jsonify({"response": {"code": 404, "message": "Database connection failed"}})


@api.route('/api/deletecontact/<identifier>')
def deletecontact(identifier):
    try:
        cursor.callproc('DeleteContact', (identifier))
        unpack_results(cursor.stored_results())
        connection.commit()
        return jsonify({"response": {"code": 200, "message": "Contact delete success"}})
    except Exception as ex:
        print(ex)
        return jsonify({"response": {"code": 404, "message": "Database connection failed"}})


@api.route('/api/editcontact/<fname>/<lname>/<phonenum>/<emailadd>/<identifier>')
def editcontact(fname, lname, phonenum, emailadd, identifier):
    try:
        cursor.callproc("EditContact", (fname, lname, phonenum, emailadd, identifier))
        unpack_results(cursor.stored_results())
        connection.commit()
        return jsonify({"response": {"code": 200, "message": "Contact edit success"}})
    except Exception as ex:
        print(ex)
        return jsonify({"response": {"code": 404, "message": "Database connection failed"}})


@api.route('/api/searchcontacts/<fname>/<lname>/<userid>')
def searchcontacts(fname, lname, userid):
    try:
        if fname == '_':
            fname = ''
        if lname == '_':
            lname = ''
        cursor.callproc("SearchContacts", (fname, lname, userid))
        results = unpack_results(cursor.stored_results())
        response = {"response": {"code": 200, "message": "Contact search success", "data": results}}
        return jsonify(response)
    except Exception as ex:
        print(ex)
        return jsonify({"response": {"code": 404, "message": "Database connection failed"}})


# Start the API
if __name__ == '__main__':
    api.run(host='0.0.0.0')