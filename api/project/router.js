// build your `/api/projects` router here
const express = require("express");
const projectModel = require("./model");

const router = express.Router();

router.get("/", (req, res, next) => {
  projectModel
    .getAll()
    .then((rows) => {
      res.status(200).json(rows);
    })
    .catch(next);
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  console.log(id);

  projectModel
    .getById(id)
    .then((rows) => {
      if (rows) {
        res.status(200).json(rows);
      } else {
        res.status(404).json({ message: "Project not found" });
      }
    })
    .catch(next);
});

router.post("/", (req, res, next) => {
  const { project_name, project_description, project_completed } = req.body;

  if (!project_name) {
    return res.status(400).json({ error: "Project name is required" });
  }
  projectModel
    .create({ project_name, project_description, project_completed })
    .then((createdProject) => {
      res.status(201).json(createdProject);
    })
    .catch(next);
});

module.exports = router;
