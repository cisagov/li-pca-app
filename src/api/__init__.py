"""The example library."""
# We disable a Flake8 check for "Module imported but unused (F401)" here because
# although this import is not directly used, it populates the value
# package_name.__version__, which is used to get version information about this
# Python package.
# cisagov Libraries
from api.controllers import (
    assessments_controller,
    authorization_controller,
    campaigns_controller,
    customers_controller,
    documents_controller,
    templates_controller,
    user_controller,
)

from ._version import __version__  # noqa: F401

# from api.models import (
#     api_response,
#     assessment,
#     base_model,
#     campaign,
#     customer,
#     document,
#     template,
#     user,
# )
# from api import (
#     encoder,
#     type_util,
#     util,
# )


__all__ = [
    "assessments_controller",
    "authorization_controller",
    "campaigns_controller",
    "customers_controller",
    "documents_controller",
    "templates_controller",
    "user_controller",
    # "api_response",
    # "assessment",
    # "base_model",
    # "campaign",
    # "customer",
    # "document",
    # "template",
    # "user",
    # "encoder",
    # "type_util",
    # "util"
]
