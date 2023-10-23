#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import User
# Add your model imports


# Views go here!

@app.route('/')
def index():
    return '<h1>Productivity App Server</h1>'


if __name__ == '__main__':
    app.run(port=5000, debug=True)