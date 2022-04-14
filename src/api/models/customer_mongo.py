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


class CustomerSchema(BaseSchema):
    """Customer Schema."""

    name = (fields.Str(required=True),)
    identifier = fields.Str(required=True, unique=True)
    address_1 = fields.Str(required=True)
    address_2 = fields.Str()
    city = fields.Str(required=True)
    state = fields.Str(required=True)
    zip_code = fields.Str(required=True)
    customer_type = fields.Str(
        required=True,
        validate=validate.OneOf(["Federal", "State", "Local", "Tribal", "Private"]),
    )
    contact_list = fields.List(fields.Nested(CustomerContactSchema), required=True)
    industry = fields.Str()
    sector = fields.Str()
    domain = fields.Str()
    appendix_a_date = DateTimeField()
