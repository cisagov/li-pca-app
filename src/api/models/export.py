"""Export schemas."""
# Third-Party Libraries
from marshmallow import fields

# cisagov Libraries
from api.models.base import BaseSchema


class ExportSchema(BaseSchema):
    """ExportSchema."""

    name = fields.Str(required=True)
    description = fields.Str()
