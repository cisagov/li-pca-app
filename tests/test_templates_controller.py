# coding: utf-8
"""Templates Controller Test Logic."""

from __future__ import absolute_import

# Third-Party Libraries
from flask import json

# cisagov Libraries
from api.models.template import Template  # noqa: E501
from tests import BaseTestCase

# from six import BytesIO


EXAMPLE_UUID = "uuid_example"
UUID_URL = f"/Nick-Viola-Dev/Li-PCA2-APP/1.0.0/templates/{EXAMPLE_UUID}"


class TestTemplatesController(BaseTestCase):
    """TemplatesController integration test stubs."""

    def test_create_template(self):
        """Test case for create_template.

        Add a new template to the data store
        """
        body = Template()
        response = self.client.open(
            "/Nick-Viola-Dev/Li-PCA2-APP/1.0.0/templates",
            method="POST",
            data=json.dumps(body),
            content_type="application/json",
        )
        self.assert200(response, "Response body is : " + response.data.decode("utf-8"))

    def test_delete_template_by_uuid(self):
        """Test case for delete_template_by_uuid.

        Deletes a template.
        """
        response = self.client.open(
            UUID_URL,
            method="DELETE",
        )
        self.assert200(response, "Response body is : " + response.data.decode("utf-8"))

    def test_get_all_templates(self):
        """Test case for get_all_templates.

        Find all templates.
        """
        query_string = [("name", "name_example")]
        response = self.client.open(
            "/Nick-Viola-Dev/Li-PCA2-APP/1.0.0/templates",
            method="GET",
            query_string=query_string,
        )
        self.assert200(response, "Response body is : " + response.data.decode("utf-8"))

    def test_get_template_by_uuid(self):
        """Test case for get_template_by_uuid.

        Find template by uuid
        """
        response = self.client.open(
            UUID_URL,
            method="GET",
        )
        self.assert200(response, "Response body is : " + response.data.decode("utf-8"))

    def test_update_template_by_uuid(self):
        """Test case for update_template_by_uuid.

        Update an existing template.
        """
        body = Template()
        response = self.client.open(
            UUID_URL,
            method="PUT",
            data=json.dumps(body),
            content_type="application/json",
        )
        self.assert200(response, "Response body is : " + response.data.decode("utf-8"))


if __name__ == "__main__":
    # Standard Python Libraries
    import unittest

    unittest.main()
