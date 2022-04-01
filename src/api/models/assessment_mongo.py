"""Assessment Schemas."""
# Third-Party Libraries
from marshmallow import fields, validate

# cisagov Libraries
from api.models.base import BaseSchema


class AssessmentSchema(BaseSchema):
    """Assessment Schema."""

    _id = fields.UUID(
        primary_key=True, required=True, validate=validate.Regexp("^RV[0-9]{4,5}")
    )
