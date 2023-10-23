#!/usr/bin/env python3

# Standard library imports
from random import choice as rc, random, randint

# Remote library imports
from faker import Faker


# Local imports
from app import app
from models import db, User, Quest, Review, UserQuest

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        pass