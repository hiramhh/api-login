const { registry } = require("../controllers/users");

const { Router } = require("express");

const router = Router();

router.post("/users", registry);

module.exports = router;
