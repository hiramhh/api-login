const users = require("../controllers/users");
const students = require("../controllers/students");
const admins = require("../controllers/admins");
const middleware = require("../middleware/index");


const { Router } = require("express");

const router = Router();


// -----------------Students endpoints---------------
// Create a students
router.post("/students/registry", middleware.getDataValidated.validate, students.registry);

// login students
router.post("/student/login",students.login);

// Get student data by Token
router.get("/student", middleware.verifyToken.verifyToken, students.dataStudents);


// Update data student
router.put("/student", middleware.verifyToken.verifyToken, students.updateStudentData);


// Delete student
router.delete("/student", middleware.verifyToken.verifyToken, students.deleteStudent);


// ------------------- Admin endpoints ----------------

// Crete an admin
router.post("/admin/registry", middleware.getDataValidated.validate, admins.registry);

// Login admin
router.post("/admin/login", admins.login)

// Disable a student
router.post("/disable/students", middleware.verifyToken.verifyToken, middleware.isAdmin.isAdmin, admins.disableStudent);

// Get all users
router.get("/users", middleware.verifyToken.verifyToken, middleware.isAdmin.isAdmin, users.getAll);

module.exports = router;
