"""Tests for Utility functions."""
# Third-Party Libraries
import pytest

# cisagov Libraries
from api.util import deserialize_date, deserialize_datetime, deserialize_model


class TestDeserializers:
    """Test deserializer functions."""

    def test_invalid_args_deserialize_date(self):
        """Validate invalid args are handled."""
        with pytest.raises(ValueError):
            deserialize_date(1)

    def test_invalid_args_deserialize_datetime(self):
        """Validate invalid args are handled."""
        with pytest.raises(ValueError):
            deserialize_datetime(1)

    def test_invalid_args_deserialize_model(self):
        """Validate invalid args are handled."""
        with pytest.raises(ValueError):
            deserialize_model(1)
