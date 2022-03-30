#!/usr/bin/env python
"""Customers Controller Logic."""

# Standard Python Libraries
import logging

# Third-Party Libraries
# from pymodm.errors import DoesNotExist, OperationError
import connexion
from flask import jsonify

# cisagov Libraries
from api.db_manager import CustomerManager

db_manager = CustomerManager()


def create_customer(body=None):  # noqa: E501
    """Add a new customer to the data store.

    # noqa: E501

    :param body: Customer object to be added to data store
    :type body: dict | bytes

    :rtype: None
    """
    logging.debug("Conn request: %s", connexion.request.get_json())
    if connexion.request.is_json:
        body = connexion.request.get_json()
        logging.debug("Body: %s", body)
        logging.debug("Body: %s", body)
        return jsonify(db_manager.save(body))


def delete_customer_by_uuid(uuid):  # noqa: E501
    """Delete a customer.

     # noqa: E501

    :param uuid: uuid to delete
    :type uuid: str

    :rtype: None
    """
    logging.debug("uuid: %s", uuid)
    return jsonify(db_manager.delete(uuid))


def get_all_customers(uuid):  # noqa: E501
    """Find all customers.

    Multiple status values can be provided with comma separated strings # noqa: E501

    :param name: Customer name filter
    :type name: List[str]

    :rtype: List[Customer]
    """
    logging.debug("uuid: %s", uuid)
    logging.debug("request args: %s", connexion.request.args)
    return jsonify(db_manager.all(params=db_manager.get_query(connexion.request.args)))
    return db_manager.all(params=db_manager.get_query(connexion.request.args))


def get_customer_by_uuid(uuid):  # noqa: E501
    """Find customer by uuid.

    Returns a single customer # noqa: E501

    :param uuid: uuid of customer to return
    :type uuid: str

    :rtype: Customer
    """
    logging.debug("uuid: %s", uuid)
    return jsonify(db_manager.get(document_id=uuid))


def update_customer_by_uuid(uuid):  # noqa: E501
    """Update an existing customer.

     # noqa: E501

    :param uuid: uuid of customer to update
    :type uuid: str
    :param body: Customer object to be added to data store
    :type body: dict | bytes

    :rtype: None
    """
    logging.debug("uuid: %s", uuid)
    return db_manager.update(document_id=uuid, data=connexion.request.get_json())
