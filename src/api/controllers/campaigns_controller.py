#!/usr/bin/env python
"""Campaigns Controller Logic."""

# Standard Python Libraries
import logging

# Third-Party Libraries
import connexion
from flask import jsonify

# cisagov Libraries
from api.db_manager import CampaignManager

db_manager = CampaignManager()


def create_campaign(body=None):  # noqa: E501
    """Add a new campaign to the data store.

     # noqa: E501

    :param body: Campaign object to be added to data store
    :type body: dict | bytes

    :rtype: None
    """
    logging.debug("Conn request: %s", connexion.request.get_json())
    if connexion.request.is_json:
        body = connexion.request.get_json()
        logging.debug("Body: %s", body)
        logging.debug("Body: %s", body)
        return jsonify(db_manager.save(body))


def delete_campaign_by_uuid(uuid):  # noqa: E501
    """Delete a campaign.

     # noqa: E501

    :param uuid: uuid to delete
    :type uuid: str

    :rtype: None
    """
    logging.debug("uuid: %s", uuid)
    return jsonify(db_manager.delete(uuid))


def get_all_campaigns(uuid):  # noqa: E501
    """Find all campaigns.

    Multiple status values can be provided with comma separated strings  # noqa: E501

    :param name: template name filter
    :type name: List[str]

    :rtype: List[Template]
    """
    logging.debug("uuid: %s", uuid)
    logging.debug("request args: %s", connexion.request.args)
    return jsonify(db_manager.all(params=db_manager.get_query(connexion.request.args)))
    return db_manager.all(params=db_manager.get_query(connexion.request.args))


def get_campaign_by_uuid(uuid):  # noqa: E501
    """Find template by uuid.

    Returns a single campaign # noqa: E501

    :param uuid: uuid of template to return
    :type uuid: str

    :rtype: Template
    """
    logging.debug("uuid: %s", uuid)
    return jsonify(db_manager.get(document_id=uuid))


def update_campaign_by_uuid(uuid, body=None):  # noqa: E501
    """Update an existing campaign.

     # noqa: E501

    :param uuid: uuid of campaign to update
    :type uuid: str
    :param body: Campaign object to be added to data store
    :type body: dict | bytes

    :rtype: None
    """
    logging.debug("uuid: %s", uuid)
    return db_manager.update(document_id=uuid, data=connexion.request.get_json())
