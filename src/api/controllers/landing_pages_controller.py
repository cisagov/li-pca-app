#!/usr/bin/env python
"""Landing Pages Controller Logic."""

# Standard Python Libraries
import logging

# Third-Party Libraries
import connexion
from flask import jsonify

# cisagov Libraries
from api.db_manager import LandingPageManager

db_manager = LandingPageManager()


def create_landing_page(body=None):  # noqa: E501
    """Add a new landing_page to the data store.

     # noqa: E501

    :param body: Campaign object to be added to data store
    :type body: dict | bytes

    :rtype: None
    """
    logging.debug("Conn request: %s", connexion.request.get_json())
    if connexion.request.is_json:
        body = connexion.request.get_json()
        logging.debug("Body: %s", body)
        return jsonify(db_manager.save(body))


def delete_landing_page_by_uuid(uuid):  # noqa: E501
    """Delete a landing_page.

     # noqa: E501

    :param uuid: uuid to delete
    :type uuid: str

    :rtype: None
    """
    logging.debug("uuid: %s", uuid)
    return jsonify(db_manager.delete(uuid))


def get_all_landing_pages(filter_params=None):  # noqa: E501
    """Find all landing_pages.

    Multiple status values can be provided with comma separated strings  # noqa: E501

    :param name: template name filter
    :type name: List[str]

    :rtype: List[Template]
    """
    logging.debug("request args: %s", connexion.request.args)
    filter_params = connexion.request.args
    return jsonify(db_manager.all(params=db_manager.get_query(filter_params)))


def get_landing_page_by_uuid(uuid):  # noqa: E501
    """Find template by uuid.

    Returns a single landing_page # noqa: E501

    :param uuid: uuid of template to return
    :type uuid: str

    :rtype: Template
    """
    logging.debug("uuid: %s", uuid)
    return jsonify(db_manager.get(document_id=uuid))


def update_landing_page_by_uuid(uuid, body=None):  # noqa: E501
    """Update an existing landing_page.

     # noqa: E501

    :param uuid: uuid of landing_page to update
    :type uuid: str
    :param body: Campaign object to be added to data store
    :type body: dict | bytes

    :rtype: None
    """
    logging.debug("uuid: %s", uuid)
    return db_manager.update(document_id=uuid, data=connexion.request.get_json())
