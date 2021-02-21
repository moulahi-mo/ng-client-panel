const express = require("express");
const router = express.Router();
const controllers = require("../controllers/Clients-controller");
const checkAuth = require("../middlewares/checkAuth");
router.post("/", checkAuth, controllers.Client_ADD_POST);
router.get("/", controllers.Clients_FetchALL_GET);
router.get("/:id", controllers.Client_BYID_GET);
router.delete("/:id", checkAuth, controllers.Client_BYID_DELETE);
router.put("/:id", checkAuth, controllers.Client_BYID_UPDATE);

module.exports = router;
