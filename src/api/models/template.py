# coding: utf-8
"""Template Model."""

from __future__ import absolute_import

# cisagov Libraries
from api import util
from api.models.base_model_ import Model

# from datetime import date, datetime  # noqa: F401
# from typing import Dict, List  # noqa: F401


class Template(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """

    def __init__(
        self,
        uuid: str = None,
        name: str = None,
        description: str = None,
        doc_uuid: str = None,
    ):  # noqa: E501
        """Template - a model defined in Swagger.

        :param uuid: The uuid of this Template.  # noqa: E501
        :type uuid: str
        :param name: The name of this Template.  # noqa: E501
        :type name: str
        :param description: The description of this Template.  # noqa: E501
        :type description: str
        :param doc_uuid: The doc_uuid of this Template.  # noqa: E501
        :type doc_uuid: str
        """
        self.swagger_types = {
            "uuid": str,
            "name": str,
            "description": str,
            "doc_uuid": str,
        }

        self.attribute_map = {
            "uuid": "uuid",
            "name": "name",
            "description": "description",
            "doc_uuid": "doc_uuid",
        }
        self._uuid = uuid
        self._name = name
        self._description = description
        self._doc_uuid = doc_uuid

    @classmethod
    def from_dict(cls, dikt) -> "Template":
        """Return the dict as a model.

        :param dikt: A dict.
        :type: dict
        :return: The Template of this Template.  # noqa: E501
        :rtype: Template
        """
        return util.deserialize_model(dikt, cls)

    @property
    def uuid(self) -> str:
        """Get the uuid of this Template.

        :return: The uuid of this Template.
        :rtype: str
        """
        return self._uuid

    @uuid.setter
    def uuid(self, uuid: str):
        """Set the uuid of this Template.

        :param uuid: The uuid of this Template.
        :type uuid: str
        """
        if uuid is None:
            raise ValueError(
                "Invalid value for `uuid`, must not be `None`"
            )  # noqa: E501

        self._uuid = uuid

    @property
    def name(self) -> str:
        """Get the name of this Template.

        :return: The name of this Template.
        :rtype: str
        """
        return self._name

    @name.setter
    def name(self, name: str):
        """Set the name of this Template.

        :param name: The name of this Template.
        :type name: str
        """
        if name is None:
            raise ValueError(
                "Invalid value for `name`, must not be `None`"
            )  # noqa: E501

        self._name = name

    @property
    def description(self) -> str:
        """Get the description of this Template.

        :return: The description of this Template.
        :rtype: str
        """
        return self._description

    @description.setter
    def description(self, description: str):
        """Set the description of this Template.

        :param description: The description of this Template.
        :type description: str
        """
        if description is None:
            raise ValueError(
                "Invalid value for `description`, must not be `None`"
            )  # noqa: E501

        self._description = description

    @property
    def doc_uuid(self) -> str:
        """Get the doc_uuid of this Template.

        Doc uuid for screenshot  # noqa: E501

        :return: The doc_uuid of this Template.
        :rtype: str
        """
        return self._doc_uuid

    @doc_uuid.setter
    def doc_uuid(self, doc_uuid: str):
        """Set the doc_uuid of this Template.

        Doc uuid for screenshot  # noqa: E501

        :param doc_uuid: The doc_uuid of this Template.
        :type doc_uuid: str
        """
        if doc_uuid is None:
            raise ValueError(
                "Invalid value for `doc_uuid`, must not be `None`"
            )  # noqa: E501

        self._doc_uuid = doc_uuid
