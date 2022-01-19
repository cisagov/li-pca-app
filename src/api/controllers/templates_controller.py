# Third-Party Libraries
import connexion
import six

# cisagov Libraries
from api import util
from api.models.template import Template  # noqa: E501


def create_template(body=None):  # noqa: E501
    """Add a new template to the data store

     # noqa: E501

    :param body: Campaign object to be added to data store
    :type body: dict | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        body = Template.from_dict(connexion.request.get_json())  # noqa: E501
    return "do some magic!"


def delete_template_by_uuid(uuid):  # noqa: E501
    """Deletes a template

     # noqa: E501

    :param uuid: uuid to delete
    :type uuid: str

    :rtype: None
    """
    return "do some magic!"


def get_all_templates(name=None):  # noqa: E501
    """Find all templates

    Multiple status values can be provided with comma separated strings  # noqa: E501

    :param name: template name filter
    :type name: List[str]

    :rtype: List[Template]
    """
    return "do some magic!"


def get_template_by_uuid(uuid):  # noqa: E501
    """Find template by uuid

    Returns a single template # noqa: E501

    :param uuid: uuid of template to return
    :type uuid: str

    :rtype: Template
    """
    return "do some magic!"


def update_template_by_uuid(uuid, body=None):  # noqa: E501
    """Update an existing template

     # noqa: E501

    :param uuid: uuid of template to update
    :type uuid: str
    :param body: Campaign object to be added to data store
    :type body: dict | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        body = Template.from_dict(connexion.request.get_json())  # noqa: E501
    return "do some magic!"
