"""Database utility script to streamline the process for dumping and restoring Dockerized Mongo databases."""

# Standard Python Libraries
import argparse
import subprocess  # nosec


def main():
    """Dump and restore data from Dockerized Mongo DB."""
    parser = argparse.ArgumentParser("Dump or restore from a Dockerized Mongo database")

    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument(
        "-d",
        "--dump",
        action="store_true",
        help="Dumps data from the Cat-Phishing database",
    )
    group.add_argument(
        "-r",
        "--restore",
        action="store_true",
        help="Restore data from the Cat-Phishing database",
    )
    parser.add_argument(
        "path", help="A path to the local database files", default="~/dump"
    )
    parser.add_argument("-u", "--username", help="MongoDB username", default="li-pca")
    parser.add_argument(
        "-pw", "--password", help="MongoDB password", default="devpass1"
    )
    parser.add_argument(
        "-c", "--container", help="MongoDB container name", default="li-pca-db"
    )
    parser.add_argument(
        "-db", "--database", help="MongoDB database name", default="li-pca"
    )
    parser.add_argument(
        "-ho", "--host", help="MongoDB host server", default="localhost"
    )
    parser.add_argument("-p", "--port", help="MongoDB port number", default="27017")
    parser.add_argument(
        "-dp", "--docker_path", help="Path to Docker database files", default="/dump"
    )
    args = parser.parse_args()
    if args.path is not None:
        if args.dump is True:
            mongodump_cmd = [
                "docker",
                "exec",
                str(args.container),
                "/usr/bin/mongodump",
                f"--uri=mongodb://{args.username}:{args.password}@{args.host}:{args.port}/?"
                f"authSource=admin&readPreference=primary&directConnection=true&ssl=false",
                "--out",
                str(args.docker_path),
            ]
            execute_subprocess_command(mongodump_cmd)
            docker_cp_dump_cmd = [
                "docker",
                "cp",
                f"{args.container}:{args.docker_path}",
                str(args.path),
            ]
            execute_subprocess_command(docker_cp_dump_cmd)

        elif args.restore is True:
            mkdir_cmd = [
                "docker",
                "exec",
                str(args.container),
                "mkdir",
                "-p",
                str(args.docker_path),
            ]
            execute_subprocess_command(mkdir_cmd)
            docker_cp_restore_cmd = [
                "docker",
                "cp",
                str(args.path),
                f"{args.container}:{args.docker_path}",
            ]
            execute_subprocess_command(docker_cp_restore_cmd)
            mongorestore_cmd = [
                "docker",
                "exec",
                str(args.container),
                "/usr/bin/mongorestore",
                f"--uri=mongodb://{args.username}:{args.password}@{args.host}:{args.port}/?"
                "authSource=admin&readPreference=primary&directConnection=true&ssl=false",
                "--dir",
                str(args.docker_path),
            ]
            execute_subprocess_command(mongorestore_cmd)
        else:
            print("Error: must provide either dump or restore")
    exit(0)


def execute_subprocess_command(command):
    """Call subprocess.run and execute the desired command."""
    print(f"Executing command: {command}")
    out = subprocess.run(
        command, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, shell=False  # nosec
    )
    print(out.stdout.decode())


if __name__ == "__main__":
    main()
