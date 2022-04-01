"""Customer Schemas."""
# Third-Party Libraries
from marshmallow import fields, validate

# cisagov Libraries
from api.models.base import BaseSchema


class CampaignSchema(BaseSchema):
    """Campaign Schema."""

    assessment_uuid = fields.UUID(
        required=True, validate=validate.Regexp("^RV[0-9]{4,5}")
    )
    target_template_uuid = fields.UUID(required=True)
    email_template_uuid = fields.UUID(required=True)
    status = fields.Str()
