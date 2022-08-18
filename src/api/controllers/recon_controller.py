#!/usr/bin/env python
"""Recon Query Controller Logic."""

# Standard Python Libraries
# import json
import logging

# Third-Party Libraries
# from pymodm.errors import DoesNotExist, OperationError
import connexion
from flask import jsonify
import requests

# cisagov Libraries
from api.db_manager import ReconManager

logging.basicConfig(level=logging.DEBUG)

db_manager = ReconManager()


def call_harvester_query(domain):
    """Call the Harvester's query API function.

    :param domain: a domain to run the query against
    :type domain: basestring

    :rtype: query response.
    """
    harvester_url = f"http://li-pca-recon:8889/query?source=all&domain={domain}"
    # cust_dict = {"customer_id": customer_id, "domain": domain}
    response = requests.get(harvester_url)
    logging.debug("Harvester query response: %s", response)
    # response_dict = json.loads(response)
    # recon_result = {
    #   key: value for (key, value) in cust_dict.items() + response_dict.items()
    # }
    # create_recon_query_results(jsonify(recon_result))
    return response


def create_recon_results(body=None):  # noqa: E501
    """Add a new recon results to the data store.

    # noqa: E501

    :param body: Recon results object to be added to data store
    :type body: dict | bytes

    :rtype: None
    """
    logging.debug("Conn request: %s", connexion.request.get_json())
    if connexion.request.is_json:
        body = connexion.request.get_json()
        logging.debug("Body: %s", body)
        return jsonify(db_manager.save(body))


def delete_recon_result_by_uuid(uuid):  # noqa: E501
    """Delete a recon query result.

     # noqa: E501

    :param uuid: uuid to delete
    :type uuid: str

    :rtype: None
    """
    print("uuid: %s", uuid)
    return jsonify(db_manager.delete(document_id=uuid))


def get_all_recon_results(filter_params=None):  # noqa: E501
    """Find all recon results.

    Multiple status values can be provided with comma separated strings # noqa: E501

    :param name: Recon Query Result name filter
    :type name: List[str]

    :rtype: List[Recon Query Result]
    """
    filter_params = connexion.request.args
    logging.debug("request args: %s", filter_params)
    return jsonify(db_manager.all(params=db_manager.get_query(filter_params)))


def get_recon_result_by_uuid(uuid):  # noqa: E501
    """Find recon result by uuid.

    Returns a single recon result # noqa: E501

    :param uuid: uuid of recon result to return
    :type uuid: str

    :rtype: Recon Query Result
    """
    logging.debug("uuid: %s", uuid)
    return jsonify(db_manager.get(document_id=uuid))


def update_recon_result_by_uuid(body, uuid):  # noqa: E501
    """Update an existing recon result.

     # noqa: E501

    :param uuid: uuid of recon result to update
    :type uuid: str
    :param body: Recon Result object to be added to data store
    :type body: dict | bytes

    :rtype: None
    """
    logging.debug("body: %s", body)
    logging.debug("uuid: %s", uuid)
    if connexion.request.is_json:
        body = connexion.request.get_json()
        logging.debug("Body: %s", body)
        return jsonify(db_manager.update(document_id=uuid, data=body))
