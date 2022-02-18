#!/usr/bin/env python
"""Assessments Controller Logic."""

# Standard Python Libraries
import logging

# Third-Party Libraries
import connexion

# cisagov Libraries
from api.models.assessment import Assessment  # noqa: E501


def create_assessment(body):  # noqa: E501
    """Add a new assessment to the data store.

     # noqa: E501

    :param body: Assessment object that needs to be added to the store
    :type body: dict | bytes

    :rtype: None.
    """
    if connexion.request.is_json:
        body = Assessment.from_dict(connexion.request.get_json())  # noqa: E501
        logging.debug("Body: %s", body)
    return "do some magic!"


def delete_assessment_by_uuid(uuid):  # noqa: E501
    """Delete an assessment.

     # noqa: E501

    :param uuid: uuid to delete
    :type uuid: str

    :rtype: None
    """
    logging.debug("Uuid: %s", uuid)
    return "do some magic!"


def get_all_assessments(customer_uuid=None):  # noqa: E501
    """Find Assessments by status.

    Multiple status values can be provided with comma separated strings # noqa: E501

    :param customer_uuid: Assessment uuid filter
    :type customer_uuid: List[str]

    :rtype: List[Assessment]
    """
    logging.debug("Customer_uuid: %s", customer_uuid)
    return "do some magic!"


def get_assessment_by_uuid(uuid):  # noqa: E501
    """Find assessment by uuid.

    Returns a single assessment # noqa: E501

    :param uuid: uuid of assessment to return
    :type uuid: str

    :rtype: Assessment
    """
    logging.debug("Uuid: %s", uuid)
    return "do some magic!"


def update_assessment_by_uuid(body, uuid):  # noqa: E501
    """Update an existing assessment.

     # noqa: E501

    :param body: Assessment object that needs to be added to the store
    :type body: dict | bytes
    :param uuid: uuid of assessment to update
    :type uuid: str

    :rtype: None
    """
    logging.debug("Uuid: %s", uuid)
    if connexion.request.is_json:
        body = Assessment.from_dict(connexion.request.get_json())  # noqa: E501
        logging.debug("Body: %s", body)
    return "do some magic!"