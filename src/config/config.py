"""Config model."""

# Standard Python Libraries
import os
import sys

# Third-Party Libraries
import yaml

CONFIG_FILENAME = os.path.expanduser("./lipca_db.yml")
DATABASE_NAME = "database-name"
DATABASE_URI = "database-uri"
DATABASE_PORT = "database-port"
DATABASE_USER = "database-user"


class Config(object):
    """Configuration class.

    Used to provide database utilities with the database configuration.
    """

    def __init__(self):
        """Initialize the config object."""
        if not os.path.exists(CONFIG_FILENAME):
            print(
                'Configuration file not found: "%s"' % CONFIG_FILENAME, file=sys.stderr
            )
            return
        config = self.__read_config()
        self.db_name = config.get(DATABASE_NAME)
        self.db_uri = config.get(DATABASE_URI)
        self.db_port = config.get(DATABASE_PORT)
        self.db_user = config.get(DATABASE_USER)

    def __read_config(self):
        """Read and return the configuration file."""
        config_file = open(CONFIG_FILENAME, "r")
        config = yaml.safe_load(config_file)
        config_file.close()
        return config
