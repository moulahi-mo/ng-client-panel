const express = require("express");

const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");
const controllers = require("../controllers/Auth-controllers");

router.get("/", checkAuth, controllers.USERS_FETCHALL_GET);
router.get("/:uid", checkAuth, controllers.USER_BYID_GET);
router.post("/login", controllers.AUTH_LOGIN_POST);
router.post("/signup", controllers.AUTH_SIGNUP_POST);

module.exports = router;
