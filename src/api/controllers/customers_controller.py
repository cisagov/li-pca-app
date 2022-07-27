#!/usr/bin/env python
"""Customers controller logic."""

# Third-Party Libraries
import connexion

# cisagov Libraries
from api.models.customer import Customer


def create_customer(body=None):
    """Add a new customer to the data store.

    :param body: Customer object to be added to data store
    :type body: dict | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        body = Customer.from_dict(connexion.request.get_json())
    return body


def delete_customer_by_uuid(uuid):
    """Delete a customer.

    :param uuid: uuid to delete
    :type uuid: str

    :rtype: None
    """
    return "do some magic!"


def get_all_customers(name=None):
    """Find all customers.

    Multiple status values can be provided with
    comma separated strings

    :param name: Customer name filter
    :type name: List[str]

    :rtype: List[Customer]
    """
    return "do some magic!"


def get_customer_by_uuid(uuid):
    """Find customer by uuid.

    Returns a single customer

    :param uuid: uuid of customer to return
    :type uuid: str

    :rtype: Customer
    """
    return "do some magic!"


def update_customer_by_uuid(uuid, body=None):
    """Update an existing customer.

    :param uuid: uuid of customer to update
    :type uuid: str
    :param body: Customer object to be added to data store
    :type body: dict | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        body = Customer.from_dict(connexion.request.get_json())
        return body
    return "do some magic!"
