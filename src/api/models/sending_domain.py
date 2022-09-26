"""Sending Domain Schemas."""

# Third-Party Libraries
from marshmallow import Schema, fields, validate

# cisagov Libraries
from api.models.base import BaseSchema


class HeaderSchema(Schema):
    """HeaderSchema."""

    key = fields.Str()
    value = fields.Str()


class SendingDomainSchema(BaseSchema):
    """SendingDomainSchema."""

    name = fields.Str(required=True)
    interface_type = fields.Str(
        default="SMTP",
        validate=validate.OneOf(
            [
                "SMTP",
                "Mailgun",
                "SES",
            ]
        ),
    )
    from_address = fields.Str()
    headers = fields.List(fields.Nested(HeaderSchema))
    landing_page_domain = fields.Str(required=True)
    sending_ips = fields.Str()

    # SMTP
    smtp_username = fields.Str()
    smtp_password = fields.Str()
    smtp_host = fields.Str()

    # Mailgun
    mailgun_domain = fields.Str()
    mailgun_api_key = fields.Str()

    # SES
    ses_role_arn = fields.Str()

    # TODO: Write up validations based on Type