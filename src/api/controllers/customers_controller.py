#!/usr/bin/env python
"""Customers Controller Logic."""

# Standard Python Libraries
import logging

# Third-Party Libraries
# from pymodm.errors import DoesNotExist, OperationError
import connexion

# cisagov Libraries
# from api import util
# from db.customer_doc import CustomerDoc
from api.db_manager import CustomerManager

customer_manager = CustomerManager()

# from api.models.customer import Customer  # noqa: E501


def create_customer(body=None):  # noqa: E501
    """Add a new customer to the data store.

    # noqa: E501

    :param body: Customer object to be added to data store
    :type body: dict | bytes

    :rtype: None
    """
    # if body is None:
    #     logging.warning("Body parameter is null during customer creation")
    #     return
    # try:
    #     CustomerDoc.save(body["id"], body["name"], body["contact"], body["status"])

    # except OperationError as e:
    #     logging.error("OperationError encountered when trying to save to database")
    #     logging.error("%s" % e)
    # Campaign
    # loggin
    # connextion.request.get_json()
    logging.debug("Conn request: %s", connexion.request.get_json())
    if connexion.request.is_json:
        # body = User.from_dict(connexion.request.get_json())  # noqa: E501
        body = connexion.request.get_json()
        logging.debug("Body: %s", body)
        # body = connexion.request.get_json()  # noqa: E501
        logging.debug("Body: %s", body)
        customer_manager.save(body)
        return body


def delete_customer_by_uuid(uuid):  # noqa: E501
    """Delete a customer.

     # noqa: E501

    :param uuid: uuid to delete
    :type uuid: str

    :rtype: None
    """
    # try:
    #     customer = get_customer_by_uuid(uuid)
    #     if customer is None:
    #         logging.info("Customer with uuid: %d could not be found" % uuid)
    #         return
    #     customer_doc = CustomerDoc(
    #         customer["_id"], customer["name"], customer["contact"], customer["status"]
    #     )
    #     customer_doc.delete()
    # except OperationError as e:
    #     logging.error("Exception raised on customer deletion for uuid: %d" % uuid)
    #     logging.error("%s" % e)


def get_all_customers(name=None):  # noqa: E501
    """Find all customers.

    Multiple status values can be provided with comma separated strings # noqa: E501

    :param name: Customer name filter
    :type name: List[str]

    :rtype: List[Customer]
    """
    # try:
    #     all_customers = CustomerDoc.get_all_customers(name)
    #     return all_customers
    # except OperationError as e:
    #     logging.error("Exception raised on getting all customers")
    #     logging.error("%s" % e)
    return customer_manager.all(
        params=customer_manager.get_query(connexion.request.args)
    )


def get_customer_by_uuid(uuid):  # noqa: E501
    """Find customer by uuid.

    Returns a single customer # noqa: E501

    :param uuid: uuid of customer to return
    :type uuid: str

    :rtype: Customer
    """
    return customer_manager.all(
        params=customer_manager.get_query(connexion.request.args)
    )
    # try:
    #     customer = CustomerDoc.find_by_customer_uuid(uuid)
    #     if customer is None:
    #         logging.info("Customer with uuid: %d could not be found" % uuid)
    #     return customer
    # except OperationError as e:
    #     logging.error("Exception raised on getting customer with uuid: %d" % uuid)
    #     logging.error("%s" % e)


def update_customer_by_uuid(uuid, body=None):  # noqa: E501
    """Update an existing customer.

     # noqa: E501

    :param uuid: uuid of customer to update
    :type uuid: str
    :param body: Customer object to be added to data store
    :type body: dict | bytes

    :rtype: None
    """
    # if body is None:
    #     logging.warning("Body parameter is null during customer update")
    #     return

    # try:
    #     CustomerDoc.save(uuid, body["name"], body["contact"], body["status"])
    # except (DoesNotExist, OperationError) as e:
    #     logging.error("Exception raised on updating customer with uuid: %d" % uuid)
    #     logging.error("%s" % e)
