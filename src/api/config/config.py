"""Config model."""

# Standard Python Libraries
import os
import sys

# Third-Party Libraries
import yaml

CONFIG_FILENAME = os.path.expanduser("/usr/src/api/src/api/config/lipca_db.yml")
DATABASE_NAME = "database-name"
DATABASE_URI = "database-uri"
DATABASE_USER = "database-user"
CONNECTION_MAX_POOL_SIZE = "connection-max-pool-size"
CONNECTION_MIN_POOL_SIZE = "connection-min-pool-size"
CONNECTION_MAX_IDLE_TIME_MS = "connection-max-idle-time-ms"
CONNECTION_MAX_CONCURRENT = "connection-max-concurrent"
CONNECTION_SOCKET_TIMEOUT_MS = "connection-socket-timeout-ms"
CONNECTION_TIMEOUT_MS = "connection-timeout-ms"
CONNECTION_WAIT_QUEUE_TIMEOUT_MS = "connection-wait-queue-timeout-ms"
CONNECTION_HEARTBEAT_FREQUENCY_MS = "connection-heartbeat-frequency-ms"


class Config(object):
    """Configuration class.

    Used to provide database utilities with the database configuration.
    """

    db_name = ""
    db_uri = ""
    db_user = ""
    conn_max_pool_size = 0
    conn_min_pool_size = 0
    conn_max_idle_time = 0
    conn_max_concurrent = 0
    conn_socket_timeout = 0
    conn_timeout = 0
    conn_wait_queue_timeout = 0
    conn_heartbeat_frequency = 0

    def __init__(self):
        """Initialize the config object."""
        if not os.path.exists(CONFIG_FILENAME):
            print(
                'Configuration file not found: "%s"' % CONFIG_FILENAME, file=sys.stderr
            )
            return
        config_yaml = self.__read_config()
        self.db_name = config_yaml.get(DATABASE_NAME)
        self.db_uri = config_yaml.get(DATABASE_URI)
        self.db_user = config_yaml.get(DATABASE_USER)
        # self.conn_max_pool_size = config_yaml.get(CONNECTION_MAX_POOL_SIZE)
        # self.conn_min_pool_size = config_yaml.get(CONNECTION_MIN_POOL_SIZE)
        # self.conn_max_idle_time = config_yaml.get(CONNECTION_MAX_IDLE_TIME_MS)
        # self.conn_max_concurrent = config_yaml.get(CONNECTION_MAX_CONCURRENT)
        # self.conn_socket_timeout = config_yaml.get(CONNECTION_SOCKET_TIMEOUT_MS)
        # self.conn_timeout = config_yaml.get(CONNECTION_TIMEOUT_MS)
        # self.conn_wait_queue_timeout = config_yaml.get(CONNECTION_WAIT_QUEUE_TIMEOUT_MS)
        # self.conn_heartbeat_frequency = config_yaml.get(CONNECTION_HEARTBEAT_FREQUENCY_MS)

    def __read_config(self):
        """Read and return the configuration file."""
        config_file = open(CONFIG_FILENAME, "r")
        config_yaml = yaml.safe_load(config_file)
        config_file.close()
        return config_yaml
