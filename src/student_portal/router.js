const express = require("express");
const router = express.Router();

let Study_Material = require("./models/study_material").Study_Material;
let Student = require("./model/student").Student;

/**
 * @swagger
 * /studymaterial:
 *    get:
 *      description: Return list of study material
 *      produces:
 *        - application/json
 *      responses:
 *        201:
 *          description: Return found study material
 *        400:
 *          description: Something unexpected went wrong
 */

router.get("/studymaterial", (req, res) => {
  Study_Material.find()
    .then(material => {
      if (material == null || material == []) {
        res.status(200).json({ message: "no study material found" });
      }
      res.status(200).json(material);
    })
    .catch(error => res.status(401).json(error));
});

/**
 * @swagger
 * /studymaterial/{id}:
 *    get:
 *      description: Return study material
 *      produces:
 *        - application/json
 *      parameters:
 *       - name: id
 *         description: The id of the study material
 *         required: true
 *         in: path
 *         type: string
 *      responses:
 *        201:
 *          description: Return found study material
 *        400:
 *          description: Something unexpected went wrong
 */

router.get("/studymaterial/:_id", ({ params: { _id } }, res) => {
  res.contentType("application/json");
  Study_Material.findOne({ _id })
    .then(material => {
      if (material == null) {
        res.status(200).json({ message: "study material not found" });
      }
      res.status(200).json(material);
    })
    .catch(error => res.status(401).json(error));
});

/**
 * @swagger
 * /studymaterial:
 *    post:
 *      description: Add study material
 *      produces:
 *        - application/json
 *      parameters:
 *      - name: name
 *        description: The name of the study material
 *        required: true
 *        in: formData
 *        type: string
 *      - name: url
 *        description: The url to the study material
 *        required: true
 *        in: formData
 *        type: string
 *      responses:
 *        201:
 *          description: Return added study material
 *        400:
 *          description: Something unexpected went wrong
 */

router.post("/studymaterial", ({ body }, res) => {
  res.contentType("application/json");
  new Study_Material(body)
    .save()
    .then(function(material) {
      res.status(201).json(material);
    })
    .catch(function(error) {
      res.status(400).json(error);
    });
});

/**
 * @swagger
 * /studymaterial:
 *    post:
 *      description: Update student
 *      produces:
 *        - application/json
 *      parameters:
 *      - name: name
 *        description: The name of the study material
 *        required: false
 *        in: formData
 *        type: string
 *      - name: url
 *        description: The url to the study material
 *        required: false
 *        in: formData
 *        type: string
 *      responses:
 *        201:
 *          description: Return edited study material
 *        400:
 *          description: Something unexpected went wrong
 */

router.put("/studymaterial/:_id", ({ body }, { params: { _id } }, res) => {
  Study_Material.update({ _id }, body)
    .then(material => {
      res.status(201).json(material);
    })
    .catch(function(error) {
      res.status(400).json(error);
    });
});

/**
 * @swagger
 * /studymaterial/{id}:
 *    delete:
 *      description: delete study material
 *      produces:
 *        - application/json
 *      parameters:
 *       - name: id
 *         description: The id of the study material
 *         required: true
 *         in: path
 *         type: string
 *      responses:
 *        201:
 *          description: Return deleted study material
 *        400:
 *          description: Something unexpected went wrong
 */

router.delete("/studymaterial/:_id", ({ params: { _id } }, res) => {
  res.contentType("application/json");

  Study_Material.findOneAndRemove({ _id })
    .then(material => {
      res.status(200).json({ "Study material Deleted": material });
    })
    .catch(function(error) {
      res.status(400).json(error);
    });
});

/**
 * @swagger
 * /students:
 *    get:
 *      description: Return list of students
 *      produces:
 *        - application/json
 *      responses:
 *        201:
 *          description: Return created students
 *        400:
 *          description: Something unexpected went wrong
 */

router.get("/students", (req, res) => {
  Student.find()
    .then(students => {
      if (students == null || students == []) {
        res.status(200).json({ message: "no students found" });
      }
      res.status(200).json(students);
    })
    .catch(error => res.status(401).json(error));
});

/**
 * @swagger
 * /student/{id}:
 *    get:
 *      description: Return student
 *      produces:
 *        - application/json
 *      parameters:
 *       - name: id
 *         description: The Student Number of the Student
 *         required: true
 *         in: path
 *         type: string
 *      responses:
 *        201:
 *          description: Return created students
 *        400:
 *          description: Something unexpected went wrong
 */

router.get("/student/:_id", ({ params: { _id } }, res) => {
  res.contentType("application/json");
  Student.findOne({ _id })
    .then(student => {
      if (student == null) {
        res.status(200).json({ message: "student not found" });
      }
      res.status(200).json(student);
    })
    .catch(error => res.status(401).json(error));
});

module.exports = router;
