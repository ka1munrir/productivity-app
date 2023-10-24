from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users_table'
    # Add serialization rules
    
    #columns
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String)
    email = db.Column(db.String)
    phone_number = db.Column(db.String)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    # Add relationships
    to_do_lists_rel = db.relationship('ToDoList', back_populates  = 'user_rel', cascade = 'all, delete-orphan')
    shopping_items_rel = db.relationship('ShoppingItem', back_populates  = 'user_rel', cascade = 'all, delete-orphan')
    locations_rel = db.relationship('Location', back_populates  = 'user_rel', cascade = 'all, delete-orphan')
    events_rel = db.relationship('Event', back_populates  = 'user_rel', cascade = 'all, delete-orphan')
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
    @validates('username', 'password_hash', 'email', 'phone_number', 'first_name', 'last_name')
    def validate_notNull(self, key, value):
        return value if value else ValueError(f'{key} must have a value')
class ToDoList(db.Model, SerializerMixin):
    __tablename__ = 'to_do_lists_table'
	# Add Serialization Rules
    serialize_rules = ('-user_rel',)
	# Columns
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users_table.id'))
    title = db.Column(db.String)
    repeats = db.Column(db.String)
    # Add relationships
    user_rel = db.relationship('User', back_populates = 'to_do_lists_rel')
    to_do_items_rel = db.relationship('ToDoItem', back_populates = 'to_do_list_rel', cascade = 'all, delete-orphan')
	# Add association proxies

    # Add validations
    @validates('user_id', 'title')
    def validate_notNull(self, key, value):
        return value if value else ValueError(f'{key} must have a value')
class ToDoItem(db.Model, SerializerMixin):
    __tablename__ = 'to_do_items_table'
	# Add Serialization Rules
    serialize_rules = ('-to_do_list_rel', '-event_rel')
	# Columns
    id = db.Column(db.Integer, primary_key=True)
    toDoList_id = db.Column(db.Integer, db.ForeignKey('to_do_lists_table.id'))
    event_id = db.Column(db.Integer, db.ForeignKey('events_table.id'))
    title = db.Column(db.String)
    description = db.Column(db.String)
    start_date = db.Column(db.String)
    end_date = db.Column(db.String)
    completion_status = db.Column(db.String)
    urgency = db.Column(db.String)
    importance = db.Column(db.String)
    # Add relationships
    to_do_list_rel = db.relationship('ToDoList', back_populates = 'to_do_items_rel')
    event_rel = db.relationship('Event', back_populates = 'to_do_item_rel')
	# Add association proxies

    # Add validations
    @validates('toDoList_id', 'title')
    def validate_notNull(self, key, value):
        return value if value else ValueError(f'{key} must have a value')
    @validates('completion_status')
    def validate_completion_status(self, key, completion_status):
        COMPLETION_STATUS = ['Not Started', 'Completed']
        return completion_status if completion_status in COMPLETION_STATUS else ValueError(f'completion_status must be either {COMPLETION_STATUS}')
    @validates('urgency')
    def validate_urgency(self, key, urgency):
        URGENCY = ['Not Urgent', 'Urgent']
        return urgency if urgency in URGENCY else ValueError(f'urgency must be either {URGENCY}')
    @validates('importance')
    def validate_urgency(self, key, importance):
        IMPORTANCE = ['Not Important', 'Important']
        return importance if importance in IMPORTANCE else ValueError(f'importance must be either {IMPORTANCE}')
class ShoppingItem(db.Model, SerializerMixin):
    __tablename__ = 'shopping_items_table'
	# Add Serialization Rules
    serialize_rules = ('-user_rel',)
	# Columns
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users_table.id'))
    location_id = db.Column(db.Integer, db.ForeignKey('locations_table.id'))
    title = db.Column(db.String)
    quantity = db.Column(db.Integer)
    category = db.Column(db.String)
    # Add relationships
    user_rel = db.relationship('User', back_populates = 'shopping_items_rel')
    location_rel = db.relationship('Location', back_populates = 'shopping_items_rel')
	# Add association proxies

    # Add validations
    @validates('user_id', 'title', 'quantity', 'location_id', 'category')
    def validate_notNull(self, key, value):
        return value if value else ValueError(f'{key} must have a value')
class Location(db.Model, SerializerMixin):
    __tablename__ = 'locations_table'
	# Add Serialization Rules
    serialize_rules = ('-user_rel', 'events_rel', 'shopping_items_rel')
	# Columns
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users_table.id'))
    title = db.Column(db.String)
    usage = db.Column(db.Integer)
    # Add relationships
    user_rel = db.relationship('User', back_populates = 'locations_rel')
    shopping_items_rel = db.relationship('ShoppingItem', back_populates = 'location_rel')
    events_rel = db.relationship('Event', back_populates = 'location_rel')
	# Add association proxies

    # Add validations
    @validates('user_id', 'title', 'usage')
    def validate_notNull(self, key, value):
        return value if value else ValueError(f'{key} must have a value')
class Event(db.Model, SerializerMixin):
    __tablename__ = 'events_table'
	# Add Serialization Rules
    serialize_rules = ('-user_rel', '-to_do_item_rel')
	# Columns
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users_table.id'))
    location_id = db.Column(db.Integer, db.ForeignKey('locations_table.id'))
    title = db.Column(db.String)
    description = db.Column(db.String)
    start_date = db.Column(db.String)
    end_date = db.Column(db.String)
    repeats = db.Column(db.String)
    # Add relationships
    user_rel = db.relationship('User', back_populates = 'events_rel')
    to_do_item_rel = db.relationship('ToDoItem', back_populates = 'event_rel', cascade = 'all, delete-orphan')
    location_rel = db.relationship('Location', back_populates = 'events_rel')
	# Add association proxies

    # Add validations
    @validates('user_id', 'title', 'start_date')
    def validate_notNull(self, key, value):
        return value if value else ValueError(f'{key} must have a value')