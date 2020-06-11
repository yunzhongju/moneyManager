import datetime

from . import db


class SerializrableMixin(object):
    """A SQLAlchemy mixin class that can serialize itself as a JSON object"""

    def to_dict(self):
        """Return dict representation of class by iterating over database columns."""
        value = {}
        for column in self.__table__.columns:
            attribute = getattr(self, column.name)
            if isinstance(attribute, datetime.date):
                attribute = str(attribute)
            value[column.name] = attribute
        return value

    def from_dict(self, attributes):
        """Update the current instance base on attribute->value by *attributes*"""
        for attribute in attributes:
            setattr(self, attribute, attributes[attribute])
        return self


class User(db.Model, SerializrableMixin):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(50))
    password = db.Column(db.String(50))


class Account(db.Model, SerializrableMixin):
    __tablename__ = "account"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    money = db.Column(db.Float)
    date = db.Column(db.Date)
    type = db.Column(db.String(50))
    desc = db.Column(db.String(100))
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    type_id = db.Column(db.Integer, db.ForeignKey("type.id"))


class Type(db.Model, SerializrableMixin):
    __tablename__ = "type"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50))
    normal_url = db.Column(db.String(200))
    selected_url = db.Column(db.String(200))
    s_url = db.Column(db.String(200))
    kind = db.Column(db.Integer)
