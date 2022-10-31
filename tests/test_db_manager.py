"""Tests for Utility functions."""
# Third-Party Libraries
import pytest

# cisagov Libraries
from api.db_manager import Manager


class TestManager:
    """Test Manager class."""

    def test_invalid_args_collection(self):
        """Validate invalid args are handled."""
        with pytest.raises(ValueError):
            Manager(collection=1)

    def test_invalid_args_schema(self):
        """Validate invalid args are handled."""
        with pytest.raises(ValueError):
            Manager(schema=1)

    def test_invalid_args_other_indexes(self):
        """Validate invalid args are handled."""
        with pytest.raises(ValueError):
            Manager(other_indexes=1)
