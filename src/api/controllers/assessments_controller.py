#!/usr/bin/env python
"""Assessments Controller Logic."""

# Standard Python Libraries
import logging

# Third-Party Libraries
import connexion
from flask import jsonify

# cisagov Libraries
from api.db_manager import AssessmentManager

db_manager = AssessmentManager()


def create_assessment(body=None):  # noqa: E501
    """Add a new assessment to the data store.

     # noqa: E501

    :param body: Assessment object to be added to data store
    :type body: dict | bytes

    :rtype: None
    """
    logging.debug("Conn request: %s", connexion.request.get_json())
    if connexion.request.is_json:
        body = connexion.request.get_json()
        logging.debug("Body: %s", body)
        logging.debug("Body: %s", body)
        return jsonify(db_manager.save(body))


def delete_assessment_by_uuid(uuid):  # noqa: E501
    """Delete a assessment.

     # noqa: E501

    :param uuid: uuid to delete
    :type uuid: str

    :rtype: None
    """
    logging.debug("uuid: %s", uuid)
    return jsonify(db_manager.delete(uuid))


def get_all_assessments(uuid):  # noqa: E501
    """Find all assessments.

    Multiple status values can be provided with comma separated strings  # noqa: E501

    :param name: template name filter
    :type name: List[str]

    :rtype: List[Template]
    """
    logging.debug("uuid: %s", uuid)
    logging.debug("request args: %s", connexion.request.args)
    return jsonify(db_manager.all(params=db_manager.get_query(connexion.request.args)))
    return db_manager.all(params=db_manager.get_query(connexion.request.args))


def get_assessment_by_uuid(uuid):  # noqa: E501
    """Find assessment by uuid.

    Returns a single assessment # noqa: E501

    :param uuid: uuid of template to return
    :type uuid: str

    :rtype: Assessment
    """
    logging.debug("uuid: %s", uuid)
    return jsonify(db_manager.get(document_id=uuid))


def update_assessment_by_uuid(uuid, body=None):  # noqa: E501
    """Update an existing assessment.

     # noqa: E501

    :param uuid: uuid of assessment to update
    :type uuid: str
    :param body: assessment object to be added to data store
    :type body: dict | bytes

    :rtype: None
    """
    logging.debug("uuid: %s", uuid)
    return db_manager.update(document_id=uuid, data=connexion.request.get_json())
