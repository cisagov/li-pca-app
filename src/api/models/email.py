"""Customer schemas."""
# Standard Python Libraries

# Third-Party Libraries
from marshmallow import fields

# cisagov Libraries
from api.models.base import BaseSchema


class EmailSchema(BaseSchema):
    """Email Schema."""

    from_address = fields.Str(required=True)
    to_address = fields.Str(required=True)
    subject = fields.Str(required=True)
    text = fields.Str(required=True)
    html = fields.Str(required=True)
