const router = require("express").Router();
const Test = require("../db/models/test");
const Student = require("../db/models/student");

router.get("/", async (req, res, next) => {
  try {
    const tests = await Test.findAll();
    if (tests) {
      res.send(tests);
    } else {
      res.status(200).send("OK");
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    let test = await Test.findByPk(req.params.id);
    if (test) {
      res.send(test);
    } else {
      res.status(200).send("OK");
    }
  } catch (error) {
    next(error);
  }
});

router.post("/student/:studentId", async (req, res, next) => {
  try {
    let student = await Student.findByPk(req.params.studentId);

    let test = await Test.create(req.body);
    let studentTest = await test.setStudent(student);
    res.status(201).send(studentTest);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await Test.destroy({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
