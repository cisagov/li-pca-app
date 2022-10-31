#!/usr/bin/env python
"""emails Controller Logic."""

# Standard Python Libraries
import logging

# Third-Party Libraries
import connexion
from flask import jsonify
import requests

# cisagov Libraries
from api.db_manager import EmailManager

db_manager = EmailManager()


def get_template_data_by_id(template_id):
    """Get template data by ID to build Mailgun request."""
    url = "http://localhost:8080/li-pca/v1/templates/" + template_id
    resp = requests.get(url=url)
    return resp.json


def send_email(body=None):
    """Send email via mailgun.

    :param body: email object to be added to data store
    :type body: dict | bytes

    :rtype: None
    """
    body = connexion.request.get_json()
    url = body.get("url")
    api_key = body.get("api_key")

    # if body.get("template_id", False):
    #     template = get_template_data_by_id(body.get("template_id"))

    # uploaded_file = connexion.request.files['fileName']
    # uploaded_file.save("/tmp/upgrade_bundle")h

    # Setting static address as requested. Determine Default
    from_address = body.get("from_address")
    to_address = body.get("to_address")
    subject = body.get("subject")
    text = body.get("text")

    resp = send_simple_message(
        url=url,
        api_key=api_key,
        from_address=from_address,
        to_address=to_address,
        subject=subject,
        text=text,
    )

    logging.debug("Resp: %s", str(resp.json))
    return resp.json()


def send_simple_message(url, api_key, from_address, to_address, subject, text):
    """Send and email."""
    return requests.post(
        url,
        auth=("api", api_key),
        data={"from": from_address, "to": to_address, "subject": subject, "text": text},
    )


def delete_email_by_uuid(uuid):
    """Delete a email.

    :param uuid: uuid to delete
    :type uuid: str

    :rtype: None
    """
    print("uuid: %s", uuid)
    return jsonify(db_manager.delete(document_id=uuid))


def get_events(url, api_key, params):
    """Get events for specified email."""
    return requests.get(url, auth=("api", api_key), params=params)


def get_all_email_events(filter_params=None):
    """Find all emails.

    Multiple status values can be provided with comma separated strings

    :param name: email name filter
    :type name: List[str]

    :rtype: List[email]
    """
    filter_params = connexion.request.args
    filter_params.update(
        {
            "ascending": "yes",
            "limit": 25,
            "pretty": "yes",
        }
    )
    url = (filter_params.get("url"),)
    api_key = filter_params.get("api_key")
    resp = get_events(url=url, api_key=api_key, params=filter_params)
    return resp.json()


def get_email_by_uuid(uuid):
    """Find email by uuid.

    Returns a single email

    :param uuid: uuid of email to return
    :type uuid: str

    :rtype: email
    """
    logging.debug("uuid: %s", uuid)
    return jsonify(db_manager.get(document_id=uuid))


def update_email_by_uuid(body, uuid):
    """Update an existing email.

    :param uuid: uuid of email to update
    :type uuid: str
    :param body: email object to be added to data store
    :type body: dict | bytes

    :rtype: None
    """
    logging.debug("body: %s", body)
    logging.debug("uuid: %s", uuid)
    if connexion.request.is_json:
        body = connexion.request.get_json()
        logging.debug("Body: %s", body)
        return jsonify(db_manager.update(document_id=uuid, data=body))
