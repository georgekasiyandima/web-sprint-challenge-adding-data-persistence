// build your `Resource` model here
const db = require("../../data/dbConfig");

function getAll() {
  return db("resources").then((resources) =>
    resources.map((resource) => ({
      ...resource,
    }))
  );
}
function getById(id) {
  return db("resources").where({ resource_id: id }).first();
}

function create(resource) {
  return db("resources")
    .insert(resource)
    .then(([resource_id]) => getById(resource_id));
}

module.exports = {
  getAll,
  getById,
  create,
};
