"""Subscription schema."""
# Third-Party Libraries
from marshmallow import Schema, fields, validate

# cisagov Libraries
from api.models.base import BaseSchema
from api.models.customer_mongo import CustomerContactSchema
from api.models.fields import DateTimeField
from api.models.target_mongo import TargetTimelineSchema
from api.models.template_mongo import TemplateSchema


class SubscriptionNotificationSchema(Schema):
    """SubscriptionNotificationSchema."""

    message_type = fields.Str()
    sent = DateTimeField()
    email_to = fields.List(fields.Str())
    email_from = fields.Str()


class SubscriptionTargetSchema(Schema):
    """SubscriptionTargetSerializer."""

    email = fields.Email(required=True)
    first_name = fields.Str(required=False, allow_none=True)
    last_name = fields.Str(required=False, allow_none=True)
    position = fields.Str(required=False, allow_none=True)


class SubscriptionTemplatesSelectedSchema(Schema):
    """SubscriptionTemplatesSelectedSchema."""

    low = fields.List(fields.Str())
    moderate = fields.List(fields.Str())
    high = fields.List(fields.Str())


class SubscriptionTasksSchema(Schema):
    """SubscriptionTasksSchema."""

    task_uuid = fields.Str()
    task_type = fields.Str(
        validate=validate.OneOf(
            [
                "start_subscription_email",
                "status_report",
                "cycle_report",
                "yearly_report",
                "thirty_day_reminder",
                "fifteen_day_reminder",
                "five_day_reminder",
                "end_cycle",
            ]
        )
    )
    scheduled_date = DateTimeField()
    executed = fields.Bool(missing=False)
    executed_date = DateTimeField(required=False)
    error = fields.Str(required=False, allow_none=True)


class SubscriptionTestSchema(Schema):
    """SubscriptionTestSchema."""

    test_uuid = fields.Str()
    email = fields.Str()
    template = fields.Nested(TemplateSchema)
    first_name = fields.Str()
    last_name = fields.Str()
    sent = fields.Bool()
    sent_date = DateTimeField()
    opened = fields.Bool()
    clicked = fields.Bool()
    timeline = fields.List(fields.Nested(TargetTimelineSchema))
    error = fields.Str(required=False, allow_none=True)


class SubscriptionSchema(BaseSchema):
    """SubscripionSchema."""

    name = fields.Str()
    customer_id = fields.Str()
    sending_profile_id = fields.Str()
    target_domain = fields.Str()
    start_date = DateTimeField()
    primary_contact = fields.Nested(CustomerContactSchema)
    admin_email = fields.Str()
    status = fields.Str(
        validate=validate.OneOf(["created", "queued", "running", "stopped"])
    )
    target_email_list = fields.List(fields.Nested(SubscriptionTargetSchema))
    templates_selected = fields.List(fields.Str())
    continuous_subscription = fields.Bool()
    cycle_length_minutes = fields.Integer()
    cooldown_minutes = fields.Integer()
    report_frequency_minutes = fields.Integer()
    tasks = fields.List(fields.Nested(SubscriptionTasksSchema))
    processing = fields.Bool()
    archived = fields.Bool()
    notification_history = fields.List(fields.Nested(SubscriptionNotificationSchema))
    phish_header = fields.Str()
    reporting_password = fields.Str()
    test_results = fields.List(fields.Nested(SubscriptionTestSchema))
    landing_domain = fields.Str()  # The landing domain for simulated phishing URLs.
    landing_page_url = fields.Str()  # The URL to redirect to after landing domain.