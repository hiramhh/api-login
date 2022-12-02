const users = require("../controllers/users");
const students = require("../controllers/students");
const middleware = require("../middleware/index");


const { Router } = require("express");

const router = Router();

// Get all users
router.get("/users", users.getAll);

// Create user
router.post("/students-registry", middleware.getDataValidated.validate, students.registry);

// login
router.post("/login",students.login);

// Get user data by Token
router.get("/user", middleware.verifyToken.verifyToken, students.dataStudents);


// Update user
router.put("/update-data", middleware.verifyToken.verifyToken, students.getUserData);




// Delete user

module.exports = router;
