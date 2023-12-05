// build your `Project` model here
const db = require("../../data/dbConfig");

function getAll() {
  return db("projects").then((projects) =>
    projects.map((project) => ({
      ...project,
      project_completed: Boolean(project.project_completed),
    }))
  );
}

function getById(id) {
  return db("projects")
    .where({ project_id: id })
    .first()
    .then((project) => {
      if (project) {
        project.project_completed = Boolean(project.project_completed);
      }
      return project;
    });
}

function create(project) {
  

  return db("projects")
    .insert({ ...project })
    .then(([id]) => getById(id));
}

module.exports = {
  getAll,
  getById,
  create,
};
