#!/usr/bin/env python
"""recommendations Controller Logic."""

# Standard Python Libraries
import logging

# Third-Party Libraries
# from pymodm.errors import DoesNotExist, OperationError
import connexion
from flask import jsonify

# cisagov Libraries
from api.db_manager import RecommendationManager

db_manager = RecommendationManager()


def create_recommendation(body=None):  # noqa: E501
    """Add a new recommendation to the data store.

    # noqa: E501

    :param body: recommendation object to be added to data store
    :type body: dict | bytes

    :rtype: None
    """
    logging.debug("Conn request: %s", connexion.request.get_json())
    if connexion.request.is_json:
        body = connexion.request.get_json()
        logging.debug("Body: %s", body)
        return jsonify(db_manager.save(body))


def delete_recommendation_by_uuid(uuid):  # noqa: E501
    """Delete a recommendation.

     # noqa: E501

    :param uuid: uuid to delete
    :type uuid: str

    :rtype: None
    """
    print("uuid: %s", uuid)
    return jsonify(db_manager.delete(document_id=uuid))


def get_all_recommendations(filter_params=None):  # noqa: E501
    """Find all recommendations.

    Multiple status values can be provided with comma separated strings # noqa: E501

    :param name: recommendation name filter
    :type name: List[str]

    :rtype: List[recommendation]
    """
    filter_params = connexion.request.args
    logging.debug("request args: %s", filter_params)
    return jsonify(db_manager.all(params=db_manager.get_query(filter_params)))


def get_recommendation_by_uuid(uuid):  # noqa: E501
    """Find recommendation by uuid.

    Returns a single recommendation # noqa: E501

    :param uuid: uuid of recommendation to return
    :type uuid: str

    :rtype: recommendation
    """
    logging.debug("uuid: %s", uuid)
    return jsonify(db_manager.get(document_id=uuid))


def update_recommendation_by_uuid(body, uuid):  # noqa: E501
    """Update an existing recommendation.

     # noqa: E501

    :param uuid: uuid of recommendation to update
    :type uuid: str
    :param body: recommendation object to be added to data store
    :type body: dict | bytes

    :rtype: None
    """
    logging.debug("body: %s", body)
    logging.debug("uuid: %s", uuid)
    if connexion.request.is_json:
        body = connexion.request.get_json()
        logging.debug("Body: %s", body)
        return jsonify(db_manager.update(document_id=uuid, data=body))
