const users = require("../controllers/users");
const students = require("../controllers/students");
const validateData = require("../middleware/validateData");
const validateToken = require("../middleware/jwt");

const { Router } = require("express");

const router = Router();

router.get("/users", users.getAll); 


router.get("/students", students.getAll);
router.post("/students-registry", validateData.validate, students.registry);
router.post("/login",students.login);
router.get("/user", validateToken.verifyToken, students.dataStudents);

module.exports = router;
