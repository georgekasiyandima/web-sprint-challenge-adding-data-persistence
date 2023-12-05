// build your `/api/resources` router here
const express = require("express");
const resourceModel = require("./model");

const router = express.Router();

router.get("/", (req, res, next) => {
  resourceModel
    .getAll()
    .then((rows) => {
      res.status(200).json(rows);
    })
    .catch(next);
});
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const resource = await resourceModel.getById(id);
    if (resource) {
      res.status(200).json(resource);
    } else {
      res.status(404).json({ message: "Resource not found" });
    }
  } catch (error) {
    next(error);
  }
});
router.post("/", (req, res, next) => {
  const { resource_name, resource_description } = req.body;

  if (!resource_name) {
    return res.status(400).json({ error: "Resource name is required" });
  }

  resourceModel
    .create({ resource_name, resource_description })
    .then((createdResource) => {
      res.status(201).json(createdResource);
    })
    .catch(next);
});

module.exports = router;
