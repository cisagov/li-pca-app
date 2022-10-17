"""Customer Schemas."""
# Third-Party Libraries
from marshmallow import Schema, fields, validate

# cisagov Libraries
from api.models.base import BaseSchema


class TemplateAppearanceSchema(Schema):
    """TemplateAppearanceSchema."""

    grammar = fields.Integer()
    link_domain = fields.Integer()
    logo_graphics = fields.Integer()


class TemplateSenderSchema(Schema):
    """TemplateSenderSchema."""

    external = fields.Integer()
    internal = fields.Integer()
    authoritative = fields.Integer()


class TemplateRelevancySchema(Schema):
    """TemplateRelevancySchema."""

    organization = fields.Integer()
    public_news = fields.Integer()


class TemplateBehaviorSchema(Schema):
    """TemplateBehaviorSchema."""

    fear = fields.Bool()
    duty_obligation = fields.Bool()
    curiosity = fields.Bool()
    greed = fields.Bool()


class TemplateIndicatorSchema(Schema):
    """TemplateIndicatorSchema."""

    appearance = fields.Nested(TemplateAppearanceSchema)
    sender = fields.Nested(TemplateSenderSchema)
    relevancy = fields.Nested(TemplateRelevancySchema)
    behavior = fields.Nested(TemplateBehaviorSchema)


class TemplateSchema(BaseSchema):
    """TemplateSchema."""

    name = fields.Str(required=True)
    from_address = fields.Str(required=True)
    landing_page_id = fields.Str(allow_none=True)
    sending_profile_id = fields.Str(allow_none=True)
    deception_score = fields.Int(validate=validate.Range(min=1, max=6))
    retired = fields.Bool(missing=False)
    retired_description = fields.Str(default="", allow_none=True)
    sophisticated = fields.Str()
    red_flag = fields.Str()
    subject = fields.Str()
    text = fields.Str()
    html = fields.Str()
    indicators = fields.Nested(TemplateIndicatorSchema)
    campaigns = fields.List(fields.Str(), allow_none=True)
    recommendation_type = fields.Str()
    category = fields.Str(
        validate=validate.OneOf(["Social Media", "Vendors", "Internal"]),
    )
    industry = fields.List(
        fields.Str(
            allow_none=True,
            validate=validate.OneOf(
                [
                    "Academia",
                    "Chemical Sector",
                    "Commercial Facilities Sector",
                    "Communications Sector",
                    "Critical Manufacturing Sector",
                    "Dams Sector",
                    "Defense Industrial Base Sector",
                    "Emergency Services Sector",
                    "Energy Sector",
                    "Financial Services Sector",
                    "Food and Agriculture Sector",
                    "Government Facilities Sector",
                    "Healthcare and Public Health Sector",
                    "Information Technology Sector",
                    "Nuclear Reactor, Materials, and Waste Sector",
                    "Transportation Systems Sector",
                    "Water and Wastewater Systems Sector",
                ]
            ),
        )
    )
