"""BaseSchema."""
# Standard Python Libraries
import uuid

# Third-Party Libraries
from marshmallow import EXCLUDE, Schema, fields

# cisagov Libraries
from api.models.fields import DateTimeField


class BaseSchema(Schema):
    """
    BaseSchema.

    The base schema for all collections.
    """

    class Meta:
        """Meta attributes for class."""

        unknown = EXCLUDE

    _id = fields.Str()
    uuid = fields.UUID(default=uuid.uuid4())
    created = DateTimeField(allow_none=True)
    created_by = fields.String(allow_none=True)
    updated = DateTimeField(allow_none=True)
    updated_by = fields.String(allow_none=True)
