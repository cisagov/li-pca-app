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
