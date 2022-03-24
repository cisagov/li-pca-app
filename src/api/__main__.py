#!/usr/bin/env python3
"""Code to run if this package is used as a Python module."""

# Standard Python Libraries
# import logging

# Third-Party Libraries
import connexion
from flask_cors import CORS

# cisagov Libraries
from api import encoder


def main():
    """Run Main Application.."""
    app = connexion.App(__name__, specification_dir="./openapi/")
    app.app.json_encoder = encoder.JSONEncoder
    app.add_api("openapi.yaml", arguments={"title": "Li-PCA API"}, pythonic_params=True)
    CORS(app.app)
    app.run(port=8080)


if __name__ == "__main__":
    main()
