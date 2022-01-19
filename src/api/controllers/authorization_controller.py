#!/usr/bin/env python
"""Authentication Controller Logic"""

# Standard Python Libraries
import logging


def check_api_key(api_key, required_scopes):
    """Check API Key.

    Args:
        api_key ([type]): [description]
        required_scopes ([type]): [description]

    Returns:
        [type]: [description]
    """
    logging.debug("api_key: %s", api_key)
    logging.debug("required_scopes: %s", required_scopes)

    return {"test_key": "test_value"}


def check_lipca_auth(token):
    """Check Auth.

    Args:
        token ([type]): [description]

    Returns:
        [type]: [description]
    """
    logging.debug("token: %s", token)
    return {"scopes": ["read:pets", "write:pets"], "uid": "test_value"}


def validate_scope_lipca_auth(required_scopes, token_scopes):
    """Validate scope.

    Args:
        required_scopes ([type]): [description]
        token_scopes ([type]): [description]

    Returns:
        [type]: [description]
    """
    return set(required_scopes).issubset(set(token_scopes))
