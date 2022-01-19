#!/usr/bin/env python
"""Campaign Controller Logic."""

# Standard Python Libraries
import logging

# Third-Party Libraries
import connexion

# cisagov Libraries
# from api import util
from api.models.campaign import Campaign  # noqa: E501
from api.models.customer import Customer  # noqa: E501


def create_campaign(body=None):  # noqa: E501
    """Add a new campaign to the data store.

     # noqa: E501

    :param body: Campaign object to be added to data store
    :type body: dict | bytes

    :rtype: None
    """
    campaign_model = Campaign
    logging.debug("Campaign model: %s", campaign_model)

    customer_model = Customer
    logging.debug("Customer model: %s", customer_model)

    if connexion.request.is_json:
        body = Campaign.from_dict(connexion.request.get_json())  # noqa: E501
        logging.debug("Body: %s", body)
    return "do some magic!"


def delete_campaign_by_uuid(uuid):  # noqa: E501
    """Delete a campaign.

     # noqa: E501

    :param uuid: uuid to delete
    :type uuid: str

    :rtype: None
    """
    logging.debug("Uuid: %s", uuid)
    return "do some magic!"


def get_all_campaigns(name=None):  # noqa: E501
    """Find all campaigns.

    Multiple status values can be provided with comma separated strings  # noqa: E501

    :param name: campaign name filter
    :type name: List[str]

    :rtype: List[Campaign]
    """
    logging.debug("Name: %s", name)
    return "do some magic!"


def get_campaign_by_uuid(uuid):  # noqa: E501
    """Find campaign by uuid.

    Returns a single campaign # noqa: E501

    :param uuid: uuid of campaign to return
    :type uuid: str

    :rtype: Campaign
    """
    logging.debug("Uuid: %s", uuid)
    return "do some magic!"


def update_campaign_by_uuid(uuid, body=None):  # noqa: E501
    """Update an existing campaign.

     # noqa: E501

    :param uuid: uuid of campaign to update
    :type uuid: str
    :param body: Campaign object to be added to data store
    :type body: dict | bytes

    :rtype: None
    """
    logging.debug("Uuid: %s", uuid)
    if connexion.request.is_json:
        body = Campaign.from_dict(connexion.request.get_json())  # noqa: E501
        logging.debug("Body: %s", body)
    return "do some magic!"
