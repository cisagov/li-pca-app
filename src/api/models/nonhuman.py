"""NonHuman Schema."""
# Third-Party Libraries
from marshmallow import fields

# cisagov Libraries
from api.models.base import BaseSchema


class NonHumanSchema(BaseSchema):
    """NonHumanSchema."""

    asn_org = fields.Str(required=True)
