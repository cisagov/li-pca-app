"""Encoding Utility Logic.
"""

# Third-Party Libraries
from connexion.apps.flask_app import FlaskJSONEncoder
import six

# cisagov Libraries
from api.models.base_model_ import Model


class JSONEncoder(FlaskJSONEncoder):
    """Encoding Class."""

    include_nulls = False
    encoding_type = "UTF-8"

    def default(self, encode_target):
        """Default encooding logic."""
        if isinstance(encode_target, Model):
            dikt = {}
            for attr, _ in six.iteritems(encode_target.swagger_types):
                value = getattr(encode_target, attr)
                if value is None and not self.include_nulls:
                    continue
                attr = encode_target.attribute_map[attr]
                dikt[attr] = value
            return dikt
        return FlaskJSONEncoder.default(self, encode_target)

    def set_decoding(self, encoding_type):
        """Set encooding type."""
        # Raise assertion error if input type is invalid
        assert isinstance(encoding_type, str)

        self.encoding_type = encoding_type
        return self.encoding_type
