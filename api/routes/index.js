const users = require("../controllers/users");
const students = require("../controllers/students");

const { Router } = require("express");

const router = Router();

router.get("/users", users.getAll); 


router.get("/students", students.getAll);
router.post("/students-registry", students.validate, students.registry);
router.post("/login",students.login);

module.exports = router;
