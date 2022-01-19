# coding: utf-8
"""Users Controller Test Logic"""

from __future__ import absolute_import

# Third-Party Libraries
from flask import json

# cisagov Libraries
from api.models.user import User  # noqa: E501
from api.test import BaseTestCase

# from six import BytesIO


EXAMPLE_UUID = "uuid_example"
UUID_URL = f"/Nick-Viola-Dev/Li-PCA2-APP/1.0.0/users/{EXAMPLE_UUID}"


class TestUserController(BaseTestCase):
    """UserController integration test stubs"""

    def test_create_user(self):
        """Test case for create_user

        Create user
        """
        body = User()
        response = self.client.open(
            "/Nick-Viola-Dev/Li-PCA2-APP/1.0.0/user",
            method="POST",
            data=json.dumps(body),
            content_type="application/json",
        )
        self.assert200(response, "Response body is : " + response.data.decode("utf-8"))

    def test_create_users_with_array_input(self):
        """Test case for create_users_with_array_input

        Creates list of users with given input array
        """
        body = [User()]
        response = self.client.open(
            "/Nick-Viola-Dev/Li-PCA2-APP/1.0.0/user/createWithArray",
            method="POST",
            data=json.dumps(body),
            content_type="application/json",
        )
        self.assert200(response, "Response body is : " + response.data.decode("utf-8"))

    def test_create_users_with_list_input(self):
        """Test case for create_users_with_list_input

        Creates list of users with given input array
        """
        body = [User()]
        response = self.client.open(
            "/Nick-Viola-Dev/Li-PCA2-APP/1.0.0/user/createWithList",
            method="POST",
            data=json.dumps(body),
            content_type="application/json",
        )
        self.assert200(response, "Response body is : " + response.data.decode("utf-8"))

    def test_delete_user(self):
        """Test case for delete_user

        Delete user
        """
        response = self.client.open(
            UUID_URL,
            method="DELETE",
        )
        self.assert200(response, "Response body is : " + response.data.decode("utf-8"))

    def test_get_user_by_name(self):
        """Test case for get_user_by_name

        Get user by user name
        """
        response = self.client.open(
            UUID_URL,
            method="GET",
        )
        self.assert200(response, "Response body is : " + response.data.decode("utf-8"))

    def test_login_user(self):
        """Test case for login_user

        Logs user into the system
        """
        query_string = [
            ("username", "username_example"),
            ("password", "password_example"),
        ]
        response = self.client.open(
            "/Nick-Viola-Dev/Li-PCA2-APP/1.0.0/user/login",
            method="GET",
            query_string=query_string,
        )
        self.assert200(response, "Response body is : " + response.data.decode("utf-8"))

    def test_logout_user(self):
        """Test case for logout_user

        Logs out current logged in user session
        """
        response = self.client.open(
            "/Nick-Viola-Dev/Li-PCA2-APP/1.0.0/user/logout", method="GET"
        )
        self.assert200(response, "Response body is : " + response.data.decode("utf-8"))

    def test_update_user(self):
        """Test case for update_user

        Updated user
        """
        body = User()
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
