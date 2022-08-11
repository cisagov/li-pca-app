#!/usr/bin/env python3
# coding=utf-8

# Third-Party Libraries
import pytest

# cisagov Libraries
from theHarvester.parsers import myparser


class TestMyParser(object):
    @pytest.mark.asyncio
    async def test_emails(self):
        word = "domain.com"
        results = "@domain.com***a@domain***banotherdomain.com***c@domain.com***d@sub.domain.com***"
        parse = myparser.Parser(results, word)
        emails = sorted(await parse.emails())
        assert emails, ["c@domain.com", "d@sub.domain.com"]


if __name__ == "__main__":
    pytest.main()
