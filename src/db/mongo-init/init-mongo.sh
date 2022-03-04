#!/bin/bash

mongo -- "$MONGO_INITDB_DATABASE" << EOF
    var rootUser = '$MONGO_INITDB_ROOT_USERNAME';
    var rootPassword = '$MONGO_INITDB_ROOT_PASSWORD';
    var admin = db.getSiblingDB('admin');
    admin.auth(rootUser, rootPassword);
    db.createCollection('customers');
    db.customers.insert({ "uuid": "a1b5bb73-7a9c-4f4b-804f-c58176282a58", "name": "Mock Customer 1"});
    db.customers.insert({ "uuid": "a1b5bb73-7a9c-4f4b-804f-c58176282a59", "name": "Mock Customer 2"});
EOF
