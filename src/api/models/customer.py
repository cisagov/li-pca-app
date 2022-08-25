"""Customer Schemas."""
# Standard Python Libraries

# Third-Party Libraries
from marshmallow import fields, validate

# cisagov Libraries
from api.models.base import BaseSchema
from api.models.fields import DateTimeField


class CustomerContactSchema(BaseSchema):
    """CustomerContact Schema."""

    first_name = fields.Str(required=True)
    last_name = fields.Str(required=True)
    email = fields.Email(required=True)
    title = fields.Str()
    office_phone = fields.Str()
    mobile_phone = fields.Str()
    notes = fields.Str()
    active = fields.Bool(default=True)


class CustomerReconResults(BaseSchema):
    """Customer Recon."""

    domain = fields.Str(required=True)
    recon_time = DateTimeField(required=True)
    asns = fields.List(fields.Str())
    interesting_urls = fields.List(fields.Str())
    twitter_people = fields.List(fields.Str())
    linkedin_people = fields.List(fields.Str())
    trello_urls = fields.List(fields.Str())
    ips = fields.List(fields.Str())
    emails = fields.List(fields.Str())
    hosts = fields.List(fields.Str())


class CustomerSchema(BaseSchema):
    """Customer Schema."""

    name = fields.Str(required=True)
    identifier = fields.Str(required=True)
    address_1 = fields.Str(required=True)
    address_2 = fields.Str()
    city = fields.Str(required=True)
    state = fields.Str(required=True)
    zip_code = fields.Str(required=True)
    customer_type = fields.Str(
        required=True,
        validate=validate.OneOf(
            ["Federal", "State", "Local", "Tribal", "Private", "Territorial"]
        ),
    )
    contact_list = fields.List(fields.Nested(CustomerContactSchema), required=True)
    industry = fields.Str()
    sector = fields.Str()
    domain = fields.Str()
    appendix_a_date = DateTimeField(required=True)
    critical_infrastructure = fields.Str(
        required=True,
        validate=validate.OneOf(
            [
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
    recon_results = fields.List(fields.Nested(CustomerReconResults))
