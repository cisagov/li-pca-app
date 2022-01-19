# coding: utf-8
"""Type Util Locic.
"""

# Standard Python Libraries
import sys

if sys.version_info < (3, 7):
    # Standard Python Libraries
    import typing

    def is_generic(klass):
        """Determine whether klass is a generic class"""
        return isinstance(klass, typing.GenericMeta)
        # return type(klass) == typing.GenericMeta

    def is_dict(klass):
        """Determine whether klass is a Dict"""
        return isinstance(klass.__extra__, dict)
        # return klass.__extra__ == dict

    def is_list(klass):
        """Determine whether klass is a List"""
        return isinstance(klass.__extra__, list)
        # return klass.__extra__ == list


else:

    def is_generic(klass):
        """Determine whether klass is a generic class"""
        return hasattr(klass, "__origin__")

    def is_dict(klass):
        """Determine whether klass is a Dict"""
        return klass.__origin__ == dict

    def is_list(klass):
        """Determine whether klass is a List"""
        return klass.__origin__ == list
