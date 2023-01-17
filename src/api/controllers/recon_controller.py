#!/usr/bin/env python
"""Recon Query Controller Logic."""

# Standard Python Libraries

# Standard Python Libraries
# import json
import logging
import os

# Third-Party Libraries
# from pymodm.errors import DoesNotExist, OperationError
from dotenv import load_dotenv
from flask import jsonify
import requests

load_dotenv()
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


def call_hunter_query(domain):
    """Call Hunter.io.

    :param domain: a domain to run the query against
    :type domain: basestring

    :rtype: query response
    """
    api_key = os.environ.get("HUNTER_IO_API_KEY")
    hunter_url = (
        f"https://api.hunter.io/v2/domain-search?domain={domain}&api_key={api_key}"
    )
    response = requests.get(hunter_url)
    query_json = response.json()
    if query_json:
        hunter_data = parse_hunter_io_results(query_json)
        query_json["data"] = hunter_data
    logging.debug("Hunter IO response: %s", response)

    return jsonify(query_json)


def parse_hunter_io_results(query_json):
    """Parse the results from Hunter.io. Strip social media accounts from results.

    :param hunter_result: a result JSON object from Hunter.io.
    :type hunter_result: JSON object

    :rtype: JSON object
    """
    social_media_fields = {"facebook", "instagram", "linkedin", "twitter", "youtube"}

    hunter_data = query_json["data"]

    for field in social_media_fields:
        if field in hunter_data:
            hunter_data.pop(field)

    for email in hunter_data["emails"]:
        for field in social_media_fields:
            if field in email:
                email.pop(field)

    return hunter_data
