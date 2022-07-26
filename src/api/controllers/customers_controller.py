#!/usr/bin/env python
"""Customers controller logic."""

# Third-Party Libraries
import connexion

# cisagov Libraries
# from api import util
from api.models.customer import Customer  # noqa: E501


def create_customer(body=None):  # noqa: E501
    """Add a new customer to the data store.

     # noqa: E501

    :param body: Customer object to be added to data store
    :type body: dict | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        body = Customer.from_dict(connexion.request.get_json())  # noqa: E501
    return body


def delete_customer_by_uuid(uuid):  # noqa: E501
    """Delete a customer.

     # noqa: E501

    :param uuid: uuid to delete
    :type uuid: str

    :rtype: None
    """
    return "do some magic!"


def get_all_customers(name=None):  # noqa: E501
    """Find all customers.

    Multiple status values can be provided with comma separated strings # noqa: E501

    :param name: Customer name filter
    :type name: List[str]

    :rtype: List[Customer]
    """
    return "do some magic!"


def get_customer_by_uuid(uuid):  # noqa: E501
    """Find customer by uuid.

    Returns a single customer # noqa: E501

    :param uuid: uuid of customer to return
    :type uuid: str

    :rtype: Customer
    """
    return "do some magic!"


def update_customer_by_uuid(uuid, body=None):  # noqa: E501
    """Update an existing customer.

     # noqa: E501

    :param uuid: uuid of customer to update
    :type uuid: str
    :param body: Customer object to be added to data store
    :type body: dict | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        body = Customer.from_dict(connexion.request.get_json())  # noqa: E501
        return body
    return "do some magic!"
