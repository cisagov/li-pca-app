"""API models logic."""

# Standard Python Libraries
import pprint
import typing

# Third-Party Libraries
import six  # type: ignore

# cisagov Libraries
from api import util

CustomType = typing.TypeVar("CustomType")


class Model:
    """Model class."""

    # swaggerTypes: The key is attribute name and the
    # value is attribute type.
    # example = {"key": "val"}

    swagger_types = {}  # type: ignore

    # attributeMap: The key is attribute name and the
    # value is json key in definition.
    attribute_map = {}  # type: ignore

    @classmethod
    def from_dict(cls: typing.Type[CustomType], dikt) -> CustomType:
        """Return the dict as a model."""
        return util.deserialize_model(dikt, cls)

    def to_dict(self):
        """Return the model properties as a dict.

        :rtype: dict
        """
        result = {}

        for attr, _ in six.iteritems(self.swagger_types):
            value = getattr(self, attr)
            if isinstance(value, list):
                result[attr] = list(
                    map(lambda x: x.to_dict() if hasattr(x, "to_dict") else x, value)
                )
            elif hasattr(value, "to_dict"):
                result[attr] = value.to_dict()
            elif isinstance(value, dict):
                result[attr] = dict(
                    map(
                        lambda item: (item[0], item[1].to_dict())
                        if hasattr(item[1], "to_dict")
                        else item,
                        value.items(),
                    )
                )
            else:
                result[attr] = value

        return result

    def to_str(self):
        """Return the string representation of the model.

        :rtype: str
        """
        return pprint.pformat(self.to_dict())

    def __repr__(self):
        """For `print` and `pprint`."""
        return self.to_str()

    def __eq__(self, other):
        """Return true if both objects are equal."""
        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        """Return true if both objects are not equal."""
        return not self == other
