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