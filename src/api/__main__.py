#!/usr/bin/env python3
"""Code to run if this package is used as a Python module."""

# Third-Party Libraries
import connexion

# cisagov Libraries
from api import encoder
from src.db.connect import connect_from_config


def main():
    """Run Main Application.."""
    app = connexion.App(__name__, specification_dir="./openapi/")
    app.app.json_encoder = encoder.JSONEncoder
    app.add_api("openapi.yaml", arguments={"title": "Li-PCA API"}, pythonic_params=True)
    app.run(port=8080)
    connect_from_config()


if __name__ == "__main__":
    main()
