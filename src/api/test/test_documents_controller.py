# coding: utf-8

from __future__ import absolute_import

# Third-Party Libraries
from flask import json
from six import BytesIO

# cisagov Libraries
from api.models.document import Document  # noqa: E501
from api.test import BaseTestCase


class TestDocumentsController(BaseTestCase):
    """DocumentsController integration test stubs"""

    def test_create_document(self):
        """Test case for create_document

        Add a new document to the data store
        """
        body = Document()
        response = self.client.open(
            "/Nick-Viola-Dev/Li-PCA2-APP/1.0.0/documents",
            method="POST",
            data=json.dumps(body),
            content_type="application/json",
        )
        self.assert200(response, "Response body is : " + response.data.decode("utf-8"))

    def test_delete_document_by_uuid(self):
        """Test case for delete_document_by_uuid

        Deletes a document
        """
        response = self.client.open(
            "/Nick-Viola-Dev/Li-PCA2-APP/1.0.0/documents/{uuid}".format(
                uuid="uuid_example"
            ),
            method="DELETE",
        )
        self.assert200(response, "Response body is : " + response.data.decode("utf-8"))

    def test_get_all_documents(self):
        """Test case for get_all_documents

        Find all campaigns
        """
        query_string = [("name", "name_example")]
        response = self.client.open(
            "/Nick-Viola-Dev/Li-PCA2-APP/1.0.0/documents",
            method="GET",
            query_string=query_string,
        )
        self.assert200(response, "Response body is : " + response.data.decode("utf-8"))

    def test_get_document_by_uuid(self):
        """Test case for get_document_by_uuid

        Get document by uuid
        """
        response = self.client.open(
            "/Nick-Viola-Dev/Li-PCA2-APP/1.0.0/documents/{uuid}".format(
                uuid="uuid_example"
            ),
            method="GET",
        )
        self.assert200(response, "Response body is : " + response.data.decode("utf-8"))

    def test_update_document_by_uuid(self):
        """Test case for update_document_by_uuid

        Update/Replace an existing document
        """
        body = Document()
        response = self.client.open(
            "/Nick-Viola-Dev/Li-PCA2-APP/1.0.0/documents/{uuid}".format(
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
