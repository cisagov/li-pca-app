"""Settings for the database."""
# Standard Python Libraries
import os

# Third-Party Libraries
from pymongo import MongoClient

# import mongomock


def get_connection_string(db_user, db_pw, db_host, db_port):
    """Get connection string for connecting to MongoDB."""
    if os.environ.get("MONGO_TYPE", "MONGO") == "DOCUMENTDB":
        fmt = "mongodb://{}:{}@{}:{}/?ssl=true&ssl_ca_certs=static/rds-combined-ca-bundle.pem&retryWrites=false"
    else:
        fmt = "mongodb://{}:{}@{}:{}/"
    return fmt.format(db_user, db_pw, db_host, db_port)


def get_db():
    """Get database client."""
    conn_str = get_connection_string(
        os.environ.get("DB_USER"),
        os.environ.get("DB_PW"),
        os.environ.get("DB_HOST"),
        os.environ.get("DB_PORT"),
    )
    return MongoClient(
        conn_str,
        tz_aware=True,
        uuidRepresentation="standard",
        unicode_decode_error_handler="replace",
    ).pca


DB = get_db()
