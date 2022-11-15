"""Recommendation schema."""
# Third-Party Libraries
from marshmallow import fields, validate

# cisagov Libraries
from api.models.base import BaseSchema


class RecommendationSchema(BaseSchema):
    """
    RecommendationsSchema.

    This is the schema on how the recommendations are stored in the database.
    """

    title = fields.Str()
    type = fields.Str(validate=validate.OneOf(["sophisticated", "red_flag"]))
    description = fields.Str()
