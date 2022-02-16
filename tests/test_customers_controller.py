#  coding: utf-8
"""Customers Controller Test Logic."""

from __future__ import absolute_import

# cisagov Libraries
from tests import BaseTestCase

# TODO: Uncomment when functional tests are ready to connect to DB
# from flask import json
# from six import BytesIO


# from api.models.customer import Customer  # noqa: E501


EXAMPLE_UUID = "uuid_example"
UUID_URL = f"/li-pca/v1/customers/{EXAMPLE_UUID}"


class TestCustomersController(BaseTestCase):
    """CustomersController integration test stubs."""

    def test_get_customer_by_uuid(self):
        """Test case for get_customer_by_uuid.

        Find customer by uuid.
        """
        response = self.client.open(
            UUID_URL,
            method="GET",
        )
        self.assert200(response, "Response body is : " + response.data.decode("utf-8"))

    def test_delete_customer_by_uuid(self):
        """Test case for delete_customer_by_uuid.

        Delete a customer.
        """
        response = self.client.open(
            UUID_URL,
            method="DELETE",
        )
        self.assert200(response, "Response body is : " + response.data.decode("utf-8"))

    # TODO: Uncomment when functional tests are ready to connect to DB
    # def test_create_customer(self):
    #     """Test case for create_customer.

    #     Add a new customer to the data store.
    #     """
    #     body = Customer()
    #     response = self.client.open(
    #         "/Nick-Viola-Dev/Li-PCA2-APP/1.0.0/customers",
    #         method="POST",
    #         data=json.dumps(body),
    #         content_type="application/json",
    #     )
    #     self.assert200(
    #       response, "Response body is : " + response.data.decode("utf-8"))

    # TODO: Uncomment when functional tests are ready to connect to DB
    # def test_get_all_customers(self):
    #     """Test case for get_all_customers.

    #     Find all customers.
    #     """
    #     query_string = [("name", "name_example")]
    #     response = self.client.open(
    #         "/Nick-Viola-Dev/Li-PCA2-APP/1.0.0/customers",
    #         method="GET",
    #         query_string=query_string,
    #     )
    #     self.assert200(
    #         response, "Response body is : " + response.data.decode("utf-8"))

    # TODO: Uncomment when functional tests are ready to connect to DB
    # def test_update_customer_by_uuid(self):
    #     """Test case for update_customer_by_uuid.

    #     Update an existing customer.
    #     """
    #     body = Customer()
    #     response = self.client.open(
    #         UUID_URL,
    #         method="PUT",
    #         data=json.dumps(body),
    #         content_type="application/json",
    #     )
    #     self.assert200(
    #         response, "Response body is : " + response.data.decode("utf-8"))


if __name__ == "__main__":
    # Standard Python Libraries
    import unittest

    unittest.main()
