"""The Customer Document."""

# Third-Party Libraries
from pymodm import errors, fields

# cisagov Libraries
from db.base_doc import BaseDoc

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

    def get_all_customers(self, filter=None):
        """Get all customer documents in a collection in MongoDB.

        If filter is None, all customer documents in the collection are returned

        :param filter: filter by name
        :return: list of customer objects.
        :rtype: list
        """
        if filter is None:
            query_set = CustomerDoc.objects.all().order_by([("_id", 1)])
        else:
            query_set = CustomerDoc.objects.raw({"$match": {"name": {"$in": filter}}})
        all_customers = []
        for customer in query_set:
            all_customers.append(customer._id)
        return all_customers

    def get_by_customer_uuid(self, customer_uuid):
        """Get all customer documents in a collection in MongoDB.

        :return: list of customer objects.
        :rtype: list
        """
        try:
            doc = CustomerDoc.objects.raw({"_id": customer_uuid}).first()
        except errors.DoesNotExist:
            return None
        return doc

    def save(self, *args, **kwargs):
        """Receive arguments save to the database.

        :param: *args: variable length argument string of data to write.
        :param: **kwargs: keyword variable length argument string of data to write.
        """
        super(CustomerDoc, self).save(*args, **kwargs)
