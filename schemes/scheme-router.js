const express = require("express");

const Schemes = require("./scheme-model.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const schemes = await Schemes.find();
    res.json(schemes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get schemes", error: error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const scheme = await Schemes.findById(id);
    if (scheme) {
      res.json(scheme);
    } else {
      res.status(404).json({ message: "Could not find scheme with given id." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get schemes" });
  }
});

router.get("/:id/steps", async (req, res) => {
  const { id } = req.params;
  try {
    const steps = await Schemes.findSteps(id);
    if (steps.length) {
      res.json(steps);
    } else {
      res
        .status(404)
        .json({ message: "Could not find steps for given scheme" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get steps" });
  }
});

router.post("/", async (req, res) => {
  const schemeData = req.body;
  try {
    const newScheme = await Schemes.add(schemeData);
    res.status(201).json(newScheme);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create new scheme" });
  }
});

router.post("/:id/steps", async (req, res) => {
  const stepData = req.body;
  const { id } = req.params;
  try {
    const scheme = await Schemes.findById(id);
    if (scheme) {
      return Schemes.addStep(stepData, id);
    } else {
      res.status(404).json({ message: "Could not find scheme with given id." });
    }
    res.status(201).json(step);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create new step" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    const changedScheme = await Schemes.findById(id);
    if (changedScheme) {
      return Schemes.update(changes, id);
    } else {
      res.status(404).json({ message: "Could not find scheme with given id" });
    }
    res.json(updatedScheme);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update scheme" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Schemes.remove(id);
    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: "Could not find scheme with given id" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete scheme" });
  }
});

module.exports = router;
