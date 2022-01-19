# coding: utf-8
"""Campaigns Controller Test Logic"""

from __future__ import absolute_import

# Third-Party Libraries
from flask import json

# cisagov Libraries
# from api.models.campaign import Campaign  # noqa: E501
from api.models.customer import Customer  # noqa: E501
from api.test import BaseTestCase

# from six import BytesIO


EXAMPLE_UUID = "uuid_example"
UUID_URL = f"/Nick-Viola-Dev/Li-PCA2-APP/1.0.0/campaigns/{EXAMPLE_UUID}"


class TestCampaignsController(BaseTestCase):
    """CampaignsController integration test stubs"""

    def test_create_campaign(self):
        """Test case for create_campaign

        Add a new campaign to the data store
        """
        body = Customer()
        response = self.client.open(
            "/Nick-Viola-Dev/Li-PCA2-APP/1.0.0/campaigns",
            method="POST",
            data=json.dumps(body),
            content_type="application/json",
        )
        self.assert200(response, "Response body is : " + response.data.decode("utf-8"))

    def test_delete_campaign_by_uuid(self):
        """Test case for delete_campaign_by_uuid

        Deletes a campaign
        """
        response = self.client.open(
            UUID_URL,
            method="DELETE",
        )
        self.assert200(response, "Response body is : " + response.data.decode("utf-8"))

    def test_get_all_campaigns(self):
        """Test case for get_all_campaigns

        Find all campaigns
        """
        query_string = [("name", "name_example")]
        response = self.client.open(
            "/Nick-Viola-Dev/Li-PCA2-APP/1.0.0/campaigns",
            method="GET",
            query_string=query_string,
        )
        self.assert200(response, "Response body is : " + response.data.decode("utf-8"))

    def test_get_campaign_by_uuid(self):
        """Test case for get_campaign_by_uuid

        Find campaign by uuid
        """
        response = self.client.open(
            UUID_URL,
            method="GET",
        )
        self.assert200(response, "Response body is : " + response.data.decode("utf-8"))

    def test_update_campaign_by_uuid(self):
        """Test case for update_campaign_by_uuid

        Update an existing campaign
        """
        body = Customer()
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
