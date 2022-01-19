# coding: utf-8
"""Assessments Controller Test Logic"""

from __future__ import absolute_import

# Third-Party Libraries
from flask import json

# cisagov Libraries
from api.models.assessment import Assessment  # noqa: E501
from api.test import BaseTestCase

# from six import BytesIO


EXAMPLE_UUID = "uuid_example"
UUID_URL = f"/Nick-Viola-Dev/Li-PCA2-APP/1.0.0/assessments/{EXAMPLE_UUID}"


class TestAssessmentsController(BaseTestCase):
    """AssessmentsController integration test stubs"""

    def test_create_assessment(self):
        """Test case for create_assessment

        Add a new assessment to the data store
        """
        body = Assessment()
        response = self.client.open(
            "/Nick-Viola-Dev/Li-PCA2-APP/1.0.0/assessments",
            method="POST",
            data=json.dumps(body),
            content_type="application/json",
        )
        self.assert200(response, "Response body is : " + response.data.decode("utf-8"))

    def test_delete_assessment_by_uuid(self):
        """Test case for delete_assessment_by_uuid

        Deletes an assessment
        """
        response = self.client.open(
            UUID_URL,
            method="DELETE",
        )
        self.assert200(response, "Response body is : " + response.data.decode("utf-8"))

    def test_get_all_assessments(self):
        """Test case for get_all_assessments

        Finds Assessments by status
        """
        query_string = [("customer_uuid", "customer_uuid_example")]
        response = self.client.open(
            "/Nick-Viola-Dev/Li-PCA2-APP/1.0.0/assessments",
            method="GET",
            query_string=query_string,
        )
        self.assert200(response, "Response body is : " + response.data.decode("utf-8"))

    def test_get_assessment_by_uuid(self):
        """Test case for get_assessment_by_uuid

        Find assessment by uuid
        """
        response = self.client.open(
            UUID_URL,
            method="GET",
        )
        self.assert200(response, "Response body is : " + response.data.decode("utf-8"))

    def test_update_assessment_by_uuid(self):
        """Test case for update_assessment_by_uuid

        Update an existing assessment
        """
        body = Assessment()
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
