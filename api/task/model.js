// build your `Task` model here
const db = require("../../data/dbConfig");
function getAll() {
  return db("tasks")
    .join("projects", "tasks.project_id", "projects.project_id")
    .select(
      "tasks.task_id",
      "tasks.task_description",
      "tasks.task_notes",
      "tasks.task_completed",
      "projects.project_name as project_name",
      "projects.project_description as project_description",
      "projects.project_completed as project_completed"
    );
}

function getById(id) {
  return db("tasks")
    .where({ task_id: id })
    .join("projects", "tasks.project_id", "projects.project_id")
    .select(
      "tasks.*",
      "projects.project_name as project_name", 
      "projects.project_description as project_description"
    )
    .first();
}

function create(task) {
  task.task_completed = Boolean(task.task_completed);

  return db("tasks")
    .insert(task)
    .then(([task_id]) => {
      return getById(task_id);
    });
}

module.exports = {
  getAll,
  getById,
  create,
};
