# coding: utf-8

from __future__ import absolute_import

# Third-Party Libraries
from flask import json
from six import BytesIO

# cisagov Libraries
from api.models.customer import Customer  # noqa: E501
from api.test import BaseTestCase


class TestCustomersController(BaseTestCase):
    """CustomersController integration test stubs"""

    def test_create_customer(self):
        """Test case for create_customer

        Add a new customer to the data store
        """
        body = Customer()
        response = self.client.open(
            "/Nick-Viola-Dev/Li-PCA2-APP/1.0.0/customers",
            method="POST",
            data=json.dumps(body),
            content_type="application/json",
        )
        self.assert200(response, "Response body is : " + response.data.decode("utf-8"))

    def test_delete_customer_by_uuid(self):
        """Test case for delete_customer_by_uuid

        Deletes a customer
        """
        response = self.client.open(
            "/Nick-Viola-Dev/Li-PCA2-APP/1.0.0/customers/{uuid}".format(
                uuid="uuid_example"
            ),
            method="DELETE",
        )
        self.assert200(response, "Response body is : " + response.data.decode("utf-8"))

    def test_get_all_customers(self):
        """Test case for get_all_customers

        Find all customers
        """
        query_string = [("name", "name_example")]
        response = self.client.open(
            "/Nick-Viola-Dev/Li-PCA2-APP/1.0.0/customers",
            method="GET",
            query_string=query_string,
        )
        self.assert200(response, "Response body is : " + response.data.decode("utf-8"))

    def test_get_customer_by_uuid(self):
        """Test case for get_customer_by_uuid

        Find customer by uuid
        """
        response = self.client.open(
            "/Nick-Viola-Dev/Li-PCA2-APP/1.0.0/customers/{uuid}".format(
                uuid="uuid_example"
            ),
            method="GET",
        )
        self.assert200(response, "Response body is : " + response.data.decode("utf-8"))

    def test_update_customer_by_uuid(self):
        """Test case for update_customer_by_uuid

        Update an existing customer
        """
        body = Customer()
        response = self.client.open(
            "/Nick-Viola-Dev/Li-PCA2-APP/1.0.0/customers/{uuid}".format(
                uuid="uuid_example"
            ),
            method="PUT",
            data=json.dumps(body),
            content_type="application/json",
        )
        self.assert200(response, "Response body is : " + response.data.decode("utf-8"))


if __name__ == "__main__":
    # Standard Python Libraries
    import unittest

    unittest.main()
