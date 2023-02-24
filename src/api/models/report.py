"""Report schemas."""
# Third-Party Libraries
from marshmallow import fields

# cisagov Libraries
from api.models.base import BaseSchema


class ReportSchema(BaseSchema):
    """ReportSchema."""

    name = fields.Str(required=True)
    description = fields.Str()
