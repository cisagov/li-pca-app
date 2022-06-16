"""Customer Schemas."""
# Third-Party Libraries
from marshmallow import fields, validate

# cisagov Libraries
from api.models.base import BaseSchema
from api.models.fields import DateTimeField


class CampaignSchema(BaseSchema):
    """Campaign Schema."""

    assessment_uuid = fields.Str()
    description = fields.Str()
    end_datetime = DateTimeField()
    name = fields.Str()
    start_datetime = DateTimeField()
    status = fields.Str(validate=validate.OneOf(["queued", "running", "completed"]))
    target_template_uuid = fields.Str()
    email_template_uuid = fields.Str()
