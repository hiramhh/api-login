const users = require("../controllers/users");

const { Router } = require("express");

const router = Router();

router.get("/users", users.getAll); 
router.post("/users", users.registry);

module.exports = router;
