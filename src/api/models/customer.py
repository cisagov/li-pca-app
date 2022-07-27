"""Customer model."""

from __future__ import absolute_import

# Standard Python Libraries
from datetime import date, datetime  # noqa: F401
from typing import Dict, List  # noqa: F401

# cisagov Libraries
from api import util
from api.models.base_model_ import Model


class Customer(Model):
    """
    NOTE: This class is auto generated by the Swagger code generator program.
    https://swagger.io/tools/swagger-codegen/

    Do not edit the class manually.
    """  # noqa: D205

    def __init__(
        self,
        uuid: str = None,
        name: str = None,
        contact: str = None,
        status: str = None,
    ):
        """Initialize Customer model defined in Swagger.

        :param uuid: The uuid of this Customer.  # noqa: E501
        :type uuid: str
        :param name: The name of this Customer.  # noqa: E501
        :type name: str
        :param contact: The contact of this Customer.  # noqa: E501
        :type contact: str
        :param status: The status of this Customer.  # noqa: E501
        :type status: str
        """
        # noqa: E501
        self.swagger_types = {
            "uuid": str,
            "name": str,
            "contact": str,
            "status": str,
        }  # type: ignore

        self.attribute_map = {
            "uuid": "uuid",
            "name": "name",
            "contact": "contact",
            "status": "status",
        }  # type: ignore
        self._uuid = uuid
        self._name = name
        self._contact = contact
        self._status = status

    @classmethod
    def from_dict(cls, dikt) -> "Customer":
        """Return the dict as a model.

        :param dikt: A dict.
        :type: dict
        :return: The Customer of this Customer.  # noqa: E501
        :rtype: Customer
        """
        return util.deserialize_model(dikt, cls)

    @property
    def uuid(self) -> str:
        """Get the uuid of this Customer.

        :return: The uuid of this Customer.
        :rtype: str
        """
        return self._uuid  # type: ignore

    @uuid.setter
    def uuid(self, uuid: str):
        """Set the uuid of this Customer.

        :param uuid: The uuid of this Customer.
        :type uuid: str
        """
        if uuid is None:
            raise ValueError(
                "Invalid value for `uuid`, must not be `None`"
            )  # noqa: E501

        self._uuid = uuid

    @property
    def name(self) -> str:
        """Get the name of this Customer.

        :return: The name of this Customer.
        :rtype: str
        """
        return self._name  # type: ignore

    @name.setter
    def name(self, name: str):
        """Set the name of this Customer.

        :param name: The name of this Customer.
        :type name: str
        """
        if name is None:
            raise ValueError(
                "Invalid value for `name`, must not be `None`"
            )  # noqa: E501

        self._name = name

    @property
    def contact(self) -> str:
        """Get the contact of this Customer.

        :return: The contact of this Customer.
        :rtype: str
        """
        return self._contact  # type: ignore

    @contact.setter
    def contact(self, contact: str):
        """Set the contact of this Customer.

        :param contact: The contact of this Customer.
        :type contact: str
        """
        self._contact = contact

    @property
    def status(self) -> str:
        """Get the status of this Customer.

        :return: The status of this Customer.
        :rtype: str
        """
        return self._status  # type: ignore

    @status.setter
    def status(self, status: str):
        """Set the status of this Customer.

        :param status: The status of this Customer.
        :type status: str
        """
        self._status = status
