const Router = require("koa-router");
const router = new Router();
const storage = require("./model/storage");
const koaBody = require("koa-body");
const mainController = require("./controllers/main");
const loginController = require("./controllers/login");
const adminController = require("./controllers/admin");

router.get("/", mainCtrl.get);
router.post("/", mainCtrl.post);
router.get("/login", loginCtrl.get);
router.post("/login", loginCtrl.post);
router.get("/admin", adminCtrl.get);
router.post("/admin/skills", adminCtrl.postSkills);
router.post(
  "/admin/upload",
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: process.cwd() + "/public/upload"
    }
  }),
  adminController.postProduct
);

module.exports = router;