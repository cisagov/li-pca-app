#!/usr/bin/env python3
# Note: This script runs theHarvester
# Standard Python Libraries
import asyncio
import sys

# cisagov Libraries
from theHarvester import __main__

if sys.version_info.major < 3 or sys.version_info.minor < 7:
    print("\033[93m[!] Make sure you have Python 3.7+ installed, quitting.\n\n \033[0m")
    sys.exit(1)

if __name__ == "__main__":
    platform = sys.platform
    if platform == "win32":
        # Required or things will break if trying to take screenshots
        # Standard Python Libraries
        import multiprocessing

        multiprocessing.freeze_support()
        asyncio.DefaultEventLoopPolicy = asyncio.WindowsSelectorEventLoopPolicy
    else:
        # Third-Party Libraries
        import uvloop

        uvloop.install()

        if "linux" in platform:
            # Third-Party Libraries
            import aiomultiprocess

            # As we are not using Windows we can change the spawn method to fork for greater performance
            aiomultiprocess.set_context("fork")
    asyncio.run(__main__.entry_point())
