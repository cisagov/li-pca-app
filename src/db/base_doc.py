"""The Base Document."""
# Standard Python Libraries
from pprint import pprint

# Third-Party Libraries
from pymodm import MongoModel


class BaseDoc(MongoModel):
    """The Base Document."""

    def save(self, *args, **kwargs):
        """Receive arguments save to the database.

        :param: *args: variable length argument string of data to write.
        :param: **kwargs: keyword variable length argument string of data to write.

        """
        try:
            super(BaseDoc, self).save(*args, **kwargs)
        except Exception as e:
            print("Exception raised on save:", e)
            print("Subject document follows:")
            pprint(self)
            raise e

    class Meta:
        """Provide metadata & settings to the base document."""

        ignore_unknown_fields = True
