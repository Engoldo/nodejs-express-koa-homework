const express = require("express");
const router = express.Router();
const mainController = require("./controllers/main");
const loginController = require("./controllers/login");
const adminController = require("./controllers/admin");
const isAdmin = require("./libs/admin-checker");

router.get("/", mainController.get);
router.post("/", mainController.post);
router.get("/login", loginController.get);
router.post("/login", loginController.post);
router.get("/admin", isAdmin, adminController.get);
router.post("./admin/skills", isAdmin, adminController.postSkills);
router.post("/admin/upload", isAdmin, adminController.postProduct);

module.exports = router;
