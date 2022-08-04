"""Assessment Schemas."""
# Third-Party Libraries
from marshmallow import fields, validate

# cisagov Libraries
from api.models.base import BaseSchema


class AssessmentSchema(BaseSchema):
    """Assessment Schema."""

    rv_id = fields.Str(required=True, validate=validate.Regexp("^RV[0-9]{4,5}"))
    customer_uuid = fields.UUID(required=True)
