#!/usr/bin/env python
"""Templates Controller Logic."""

# Standard Python Libraries
import logging

# Third-Party Libraries
import connexion
from flask import jsonify

# cisagov Libraries
from api.db_manager import TemplateManager

db_manager = TemplateManager()


def handle_multiple_target_updates(body):  # noqa: E501
    """Take array of template objects to bulk update in DB.

     # noqa: E501

    :type list: dict

    :rtype: list: dict
    """
    logging.debug("Body: %s", body)
    updated_templates = []

    for item in body:
        logging.debug("Template Update Data: %s", item)

        # Sanitize PUT data
        target_uuid = item.pop("uuid", None)
        target_id = item.pop("_id", None)
        created = item.pop("created", None)
        created_by = item.pop("created_by", None)
        updated = item.pop("created", None)
        updated_by = item.pop("created_by", None)

        # Log Sanitized Values
        logging.debug(
            "Stripping values: %s",
            [
                target_id,
                target_uuid,
                created,
                created_by,
                updated,
                updated_by,
            ],
        )

        # Update each object in DB and append to response array.
        if target_id:
            result = db_manager.update(document_id=target_id, data=item)
            updated_templates.append(result)

    # Return List of updated templates
    return updated_templates


def create_template(body=None):  # noqa: E501
    """Add a new template to the data store.

     # noqa: E501

    :param body: Campaign object to be added to data store
    :type body: dict | bytes

    :rtype: None
    """
    logging.debug("Conn request: %s", connexion.request.get_json())
    if connexion.request.is_json:
        body = connexion.request.get_json()
        logging.debug("Body: %s", body)
        logging.debug("Body: %s", body)
        return jsonify(db_manager.save(body))


def delete_template_by_uuid(uuid):  # noqa: E501
    """Delete a template.

     # noqa: E501

    :param uuid: uuid to delete
    :type uuid: str

    :rtype: None
    """
    logging.debug("uuid: %s", uuid)
    return jsonify(db_manager.delete(uuid))


def get_all_templates(filter_params=None):  # noqa: E501
    """Find all templates.

    Multiple status values can be provided with comma separated strings  # noqa: E501

    :param name: template name filter
    :type name: List[str]

    :rtype: List[Template]
    """
    logging.debug("request args: %s", connexion.request.args)
    filter_params = connexion.request.args
    return jsonify(db_manager.all(params=db_manager.get_query(filter_params)))


def get_template_by_uuid(uuid):  # noqa: E501
    """Find template by uuid.

    Returns a single template # noqa: E501

    :param uuid: uuid of template to return
    :type uuid: str

    :rtype: Template
    """
    logging.debug("uuid: %s", uuid)
    return jsonify(db_manager.get(document_id=uuid))


def update_template_by_uuid(uuid, body=None):  # noqa: E501
    """Update an existing template.

     # noqa: E501

    :param uuid: uuid of template to update
    :type uuid: str
    :param body: Campaign object to be added to data store
    :type body: dict | bytes

    :rtype: None
    """
    logging.debug("uuid: %s", uuid)
    return db_manager.update(document_id=uuid, data=connexion.request.get_json())


def bulk_update_templates():  # noga: E501
    """Update an existing template.

     # noqa: E501

    :rtype: list: dict
    """
    body = connexion.request.get_json()
    return handle_multiple_target_updates(body)
