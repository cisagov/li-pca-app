#!/usr/bin/env python
"""Landing Page Controller Logic."""

# Standard Python Libraries
import logging

# Third-Party Libraries
# from pymodm.errors import DoesNotExist, OperationError
import connexion
from flask import jsonify

# cisagov Libraries
from api.db_manager import LandingPageManager

db_manager = LandingPageManager()


def create_landing_page(body=None):  # noqa: E501
    """Add a new item to the data store.

    # noqa: E501

    :param body: Object to be added to data store
    :type body: dict | bytes

    :rtype: None
    """
    logging.debug("Conn request: %s", connexion.request.get_json())
    if connexion.request.is_json:
        body = connexion.request.get_json()
        logging.debug("Body: %s", body)
        return jsonify(db_manager.save(body))


def delete_landing_page_by_uuid(uuid):  # noqa: E501
    """Delete an item.

     # noqa: E501

    :param uuid: uuid to delete
    :type uuid: str

    :rtype: None
    """
    print("uuid: %s", uuid)
    return jsonify(db_manager.delete(document_id=uuid))


def get_all_landing_pages(filter_params=None):  # noqa: E501
    """Find all items.

    Multiple status values can be provided with comma separated strings # noqa: E501

    :param name: name filter
    :type name: List[str]

    :rtype: List[Customer]
    """
    filter_params = connexion.request.args
    logging.debug("request args: %s", filter_params)
    return jsonify(db_manager.all(params=db_manager.get_query(filter_params)))


def get_landing_page_by_uuid(uuid):  # noqa: E501
    """Find item by uuid.

    Returns a single object # noqa: E501

    :param uuid: uuid of item to return
    :type uuid: str

    :rtype: LandingPage
    """
    logging.debug("uuid: %s", uuid)
    return jsonify(db_manager.get(document_id=uuid))


def update_landing_page_by_uuid(body, uuid):  # noqa: E501
    """Update an existing item.

     # noqa: E501

    :param uuid: uuid of item to update
    :type uuid: str
    :param body: Landing Page object to be added to data store
    :type body: dict | bytes

    :rtype: None
    """
    logging.debug("body: %s", body)
    logging.debug("uuid: %s", uuid)
    if connexion.request.is_json:
        body = connexion.request.get_json()
        logging.debug("Body: %s", body)
        return jsonify(db_manager.update(document_id=uuid, data=body))
