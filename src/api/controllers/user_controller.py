#!/usr/bin/env python
"""Users Controller Logic."""

# Standard Python Libraries
import logging

# Third-Party Libraries
import connexion

# cisagov Libraries
# from api import util
from api.models.user import User  # noqa: E501


def create_user(body):  # noqa: E501
    """Create user.

    This can only be done by the logged in user. # noqa: E501

    :param body: Created user object
    :type body: dict | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        body = User.from_dict(connexion.request.get_json())  # noqa: E501
        logging.debug("Body: %s", body)
    return "do some magic!"


def create_users_with_array_input(body):  # noqa: E501
    """Create list of users with given input array.

     # noqa: E501

    :param body: List of user object
    :type body: list | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        body = [User.from_dict(d) for d in connexion.request.get_json()]  # noqa: E501
        logging.debug("Body: %s", body)
    return "do some magic!"


def create_users_with_list_input(body):  # noqa: E501
    """Create list of users with given input array.

     # noqa: E501

    :param body: List of user object
    :type body: list | bytes

    :rtype: None
    """
    if connexion.request.is_json:
        body = [User.from_dict(d) for d in connexion.request.get_json()]  # noqa: E501
        logging.debug("Body: %s", body)
    return "do some magic!"


def delete_user(username):  # noqa: E501
    """Delete user.

    This can only be done by the logged in user. # noqa: E501

    :param username: The name that needs to be deleted
    :type username: str

    :rtype: None
    """
    logging.debug("username: %s", username)
    return "do some magic!"


def get_user_by_name(username):  # noqa: E501
    """Get user by user name.

     # noqa: E501

    :param username: The name that needs to be fetched. Use user1 for testing.
    :type username: str

    :rtype: User
    """
    logging.debug("username: %s", username)
    return "do some magic!"


def login_user(username, password):  # noqa: E501
    """Log user into the system.

     # noqa: E501

    :param username: The user name for login
    :type username: str
    :param password: The password for login in clear text
    :type password: str

    :rtype: str
    """
    # TODO: replace or remove this
    hashed_password = password
    logging.debug("hased pword: %s", hashed_password)

    logging.debug("username: %s", username)
    return "do some magic!"


def logout_user():  # noqa: E501
    """Log out current logged in user session.

     # noqa: E501


    :rtype: None
    """
    return "do some magic!"


def update_user(body, username):  # noqa: E501
    """Update user.

    This can only be done by the logged in user. # noqa: E501

    :param body: Updated user object
    :type body: dict | bytes
    :param username: name that need to be updated
    :type username: str

    :rtype: None
    """
    logging.debug("Username: %s", username)
    if connexion.request.is_json:
        body = User.from_dict(connexion.request.get_json())  # noqa: E501
        logging.debug("Body: %s", body)
    return "do some magic!"