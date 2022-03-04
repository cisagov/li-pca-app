conn = new Mongo();
db = conn.getDB("li-pca");

// db.customers.createIndex({ "address.zip": 1 }, { unique: false });

db.customers.insert({
  uuid: "a1b5bb73-7a9c-4f4b-804f-c58176282a58",
  name: "Mock Customer 1",
});
db.customers.insert({
  uuid: "a1b5bb73-7a9c-4f4b-804f-c58176282a59",
  name: "Mock Customer 1",
});
