# Standard Python Libraries
"""Test init."""
# Standard Python Libraries
import logging

# Third-Party Libraries
import connexion
from flask_testing import TestCase

# cisagov Libraries
from api.encoder import JSONEncoder


class BaseTestCase(TestCase):
    """Base Test class."""

    def create_app(self):
        """Create the base app test."""
        logging.getLogger("connexion.operation").setLevel("ERROR")
        app = connexion.App(__name__, specification_dir="../swagger/")
        app.app.json_encoder = JSONEncoder
        app.add_api("swagger.yaml")
        return app.app