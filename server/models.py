from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users_table'
    # Add serialization rules
    serialize_rules = ('', )
    #columns
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    _password_hash = db.Column(db.String)
    email = db.Column(db.String)
    phone_number = db.Column(db.String)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    # Add relationships

    #password stuff
    @hybrid_property
    def password_hash(self):
        return self._password_hash
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8')
        )
        self._password_hash = password_hash.decode('utf-8')
    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash,
            password.encode('utf-8')
        )
    #validations

class ToDoList(db.Model, SerializerMixin):
    __tablename__ = 'to_do_lists_table'
	# Add Serialization Rules

	# Columns
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users_table.id'))
    title = db.Column(db.String)
    repeats = db.Column(db.String)
    # Add relationships

	# Add association proxies

    # Add validations

class ToDoItem(db.Model, SerializerMixin):
    __tablename__ = 'to_do_items_table'
	# Add Serialization Rules

	# Columns
    id = db.Column(db.Integer, primary_key=True)
    toDoList_id = db.Column(db.Integer, db.ForeignKey('to_do_lists_table.id'))
    event_id = db.Column(db.Integer, db.ForeignKey('events_table.id'))
    title = db.Column(db.String)
    description = db.Column(db.String)
    start_date = db.Column(db.String)
    end_date = db.Column(db.String)
    completion_status = db.Column(db.String)
    # Add relationships

	# Add association proxies

    # Add validations

class ShoppingItem(db.Model, SerializerMixin):
    __tablename__ = 'shopping_items_table'
	# Add Serialization Rules

	# Columns
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users_table.id'))
    title = db.Column(db.String)
    quantity = db.Column(db.Integer)
    location = db.Column(db.String)
    category = db.Column(db.String)
    # Add relationships

	# Add association proxies

    # Add validations

class shopLocation(db.Model, SerializerMixin):
    __tablename__ = 'shop_locations_table'
	# Add Serialization Rules

	# Columns
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users_table.id'))
    title = db.Column(db.String)
    usage = db.Column(db.Integer)
    # Add relationships

	# Add association proxies

    # Add validations

class Event(db.Model, SerializerMixin):
    __tablename__ = 'events_table'
	# Add Serialization Rules

	# Columns
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users_table.id'))
    title = db.Column(db.String)
    description = db.Column(db.String)
    start_date = db.Column(db.String)
    end_date = db.Column(db.String)
    location = db.Column(db.String)
    repeats = db.Column(db.String)
    completion_status = db.Column(db.String)
    # Add relationships

	# Add association proxies

    # Add validations
