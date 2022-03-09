"""LiPCA connection library."""

__all__ = ["connect_from_config", "get_connection_db_by_mongoclient", "db_from_config"]

# Standard Python Libraries
import logging

# Third-Party Libraries
from pymodm import connect
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure

# cisagov Libraries
from api.config.config import Config


def connect_from_config():
    """Load configuration from file and connect through PyMODM.

    Keyword arguments are passed through connect() to the underlying
    MongoClient to configure connection pool settings.

    :return: True if connection was established, False if not.
    :rtype: boolean
    """
    config = Config()
    if config is None:
        logging.error("Unable to load configuration file")
        return False
    try:
        connect(
            config.db_uri,
            tz_aware=True,
            # maxPoolSize=config.conn_max_pool_size,
            # minPoolSize=config.conn_min_pool_size,
            # maxIdleTimeMs=config.conn_max_idle_time,
            # maxConnecting=config.conn_max_concurrent,
            # socketTimeoutMS=config.conn_socket_timeout,
            # connectTimeoutMS=config.conn_timeout,
            # waitQueueTimeoutMS=config.conn_wait_queue_timeout,
            # heartbeatFrequencyMs=config.conn_heartbeat_frequency,
        )
        logging.info("Connected to LiPCA database...")
        return True
    except ConnectionFailure as e:
        logging.error("ConnectionFailure raised when trying to connect to MongoDB")
        logging.error("Details: %s" % e)


def get_connection_db_by_mongoclient(uri, name):
    """Connect to MongoDB through a MongoClient.

    :param uri: a URI to the MongoDB in the standard format beginning with mongodb://
    :type uri: str
    :param name: the name of the database to return from MongoDB
    :type name: str

    :return: conn - a MongoClient connection object
    :return: db - a Database object
    """
    conn = MongoClient.connect(uri)
    db = conn["name"]

    return conn, db


def db_from_config():
    """Load a configuration and then passes the pertinent information to get_connection_db_by_mongoclient().

    :return: the tuple returned by get_connection_db_by_mongoclient
    """
    config = Config()
    return get_connection_db_by_mongoclient(config.db_uri, config.db_name)
