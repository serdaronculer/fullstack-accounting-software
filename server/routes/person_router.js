const express = require('express');
const router = express.Router();
const personController = require('../controllers/person_controller');




router.get("/", personController.getPersons);
router.post("/", personController.addPerson);
router.get("/:id", personController.getPerson);
router.patch("/:id", personController.updatePerson);
router.delete("/:id", personController.deletePerson);


module.exports = router;