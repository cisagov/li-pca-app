#!/usr/bin/env python
"""Recon Query Controller Logic."""

# Standard Python Libraries

# Standard Python Libraries
# import json
import logging

# Third-Party Libraries
# from pymodm.errors import DoesNotExist, OperationError
from flask import jsonify
import requests

logging.basicConfig(level=logging.DEBUG)


def call_harvester_query(domain):
    """Call the Harvester's query API function.

    :param domain: a domain to run the query against
    :type domain: basestring

    :rtype: query response.
    """
    harvester_url = f"http://li-pca-recon:5000/query?source=all&domain={domain}"
    # cust_dict = {"customer_id": customer_id, "domain": domain}
    response = requests.get(harvester_url)
    query_json = response.json()
    logging.debug("Harvester query response: %s", response)

    return jsonify(query_json)


def call_hunter_query(domain, api_key):
    """Call Hunter.io.

    :param domain: a domain to run the query against
    :type domain: basestring
    :param api_key: an api_key for a Hunter.io user
    :type api_key: basestring

    :rtype: query response
    """
    hunter_url = (
        f"https://api.hunter.io/v2/domain-search?domain={domain}&api_key={api_key}"
    )
    response = requests.get(hunter_url)
    query_json = response.json()
    logging.debug("Hunter IO response: %s", response)

    return jsonify(query_json)
