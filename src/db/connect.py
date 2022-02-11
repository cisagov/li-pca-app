"""LiPCA connection library."""

__all__ = ["connect_from_config", "db_from_connection", "db_from_config"]

# Third-Party Libraries
from pymodm import connect
from pymongo import MongoClient

# cisagov Libraries
from config.config import Config


def connect_from_config():
    """Connect to Mongo from a Config object.

    :return: True if connection was successful, false if not.
    :rtype: boolean
    """
    config = Config()
    if config is None:
        return False
    connect(config.db_uri, tz_aware=True)
    return True


def db_from_connection(uri, name):
    """Connect to database from uri and name passed as arguments.

    :param uri: the address the MongoDB server is hosted at.
    :type: str
    :param name: the database name
    :type str

    :return: a MongoClient object.
    :rtype: MongoClient
    """
    con = MongoClient(host=uri, tz_aware=True)
    db = con[name]
    return db


def db_from_config():
    """Connect to MongoDB from a Configuration object.

    :return: True if connected successfully, false otherwise
    :rtype: boolean
    """
    config = Config()
    if config is None:
        return False
    return db_from_connection(config.db_uri, config.db_name)
