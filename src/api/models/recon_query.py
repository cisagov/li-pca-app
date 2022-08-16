"""Harvester Results schema."""
# Third-Party Libraries
from marshmallow import fields

# cisagov Libraries
from api.models.base import BaseSchema


class ReconQuerySchema(BaseSchema):
    """The ReconQuerySchema model."""

    customer_id = fields.Str()
    domain = fields.Str()
    asns = fields.List(fields.Str())
    interesting_urls = fields.List(fields.Str())
    twitter_people = fields.List(fields.Str())
    linkedin_people = fields.List(fields.Str())
    trello_urls = fields.List(fields.Str())
    ips = fields.List(fields.Str())
    emails = fields.List(fields.Str())
    hosts = fields.List(fields.Str())
