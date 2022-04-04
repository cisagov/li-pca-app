"""Customer Schemas."""
# Third-Party Libraries
from marshmallow import fields

# cisagov Libraries
from api.models.base import BaseSchema


class CampaignSchema(BaseSchema):
    """Campaign Schema."""

    parent_uuid = fields.UUID(required=True)
    target_template_uuid = fields.UUID(required=True)
    email_template_uuid = fields.UUID(required=True)
    status = fields.Str()
