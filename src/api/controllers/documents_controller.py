#!/usr/bin/env python
"""Documents Controller Logic"""

# Standard Python Libraries
import logging

# Third-Party Libraries
import connexion

# cisagov Libraries
# from api import util
from api.models.document import Document  # noqa: E501


def create_document(body=None):  # noqa: E501
    """Add a new document to the data store

     # noqa: E501

    :param body: Document object to be added to data store
    :type body: dict | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        body = Document.from_dict(connexion.request.get_json())  # noqa: E501
        logging.debug("Body: %s", body)
    return "do some magic!"


def delete_document_by_uuid(uuid):  # noqa: E501
    """Deletes a document

     # noqa: E501

    :param uuid: uuid of document to delete
    :type uuid: str

    :rtype: None
    """
    logging.debug("Uuid: %s", uuid)
    return "do some magic!"


def get_all_documents(name=None):  # noqa: E501
    """Find all campaigns

    Get All Documents # noqa: E501

    :param name: document name filter
    :type name: List[str]

    :rtype: List[Document]
    """
    logging.debug("name: %s", name)
    return "do some magic!"


def get_document_by_uuid(uuid):  # noqa: E501
    """Get document by uuid

    Returns a single document # noqa: E501

    :param uuid: uuid of document to return
    :type uuid: str

    :rtype: Document
    """
    logging.debug("Uuid: %s", uuid)
    return "do some magic!"


def update_document_by_uuid(uuid, body=None):  # noqa: E501
    """Update/Replace an existing document

     # noqa: E501

    :param uuid: uuid of document to update/replace
    :type uuid: str
    :param body: Document object to be added to data store
    :type body: dict | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        body = Document.from_dict(connexion.request.get_json())  # noqa: E501
        logging.debug("Body: %s", body)
    return "do some magic!"
