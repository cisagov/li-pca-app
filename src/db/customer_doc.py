"""The Customer Document."""

# Third-Party Libraries
from base_doc import BaseDoc
from pymodm import fields

CUSTOMER_COLLECTION = "customers"


class CustomerDoc(BaseDoc):
    """The Customer Document."""

    _id = fields.CharField(required=True)
    name = fields.CharField(required=True)
    contact = fields.CharField(required=True)
    status = fields.CharField(required=True)

    class Meta:
        """Provide metadata & settings to the base document."""

        collection_name = CUSTOMER_COLLECTION
        final = True  # so we don't get a '_cls' field in these documents

    def get_customers(self):
        """Get all customer documents in a collection in MongoDB.

        :return: list of customer objects.
        :rtype: list
        """
        query_set = CustomerDoc.objects.all().order_by([("_id", 1)])
        all_customers = []
        for customer in query_set:
            all_customers.append(customer._id)
        return all_customers

    def save(self, *args, **kwargs):
        """Receive arguments save to the database.

        :param: *args: variable length argument string of data to write.
        :param: **kwargs: keyword variable length argument string of data to write.
        """
        super(CustomerDoc, self).save(*args, **kwargs)
