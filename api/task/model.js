// build your `Task` model here
const db = require("../../data/dbConfig");

async function getAll() {
  const tasks = await db("tasks")
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

  return tasks.map((task) => ({
    ...task,
    task_completed: !!task.task_completed,
  }));
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
  console.log("Received task:", task);

  task.task_completed =
    task.task_completed != null ? !!task.task_completed : false;

  console.log("Converted task_completed:", task.task_completed);

  return db("tasks")
    .insert(task)
    .then(([task_id]) => {
      console.log("Inserted task with id:", task_id);
      return getById(task_id);
    })
    .then((updatedTask) => {
      console.log(updatedTask);
      const task = {
        ...updatedTask,
        task_completed:
          updatedTask.task_completed != null
            ? !!updatedTask.task_completed
            : false,
      };
      console.log(task);
      return task;
    });
}

module.exports = {
  getAll,
  getById,
  create,
};
