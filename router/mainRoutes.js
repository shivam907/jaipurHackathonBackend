const express = require("express");
const router = express.Router();
const mainControllers = require("../controllers/mainControllers");

router.get("/login", mainControllers.logInPage);
router.get("/signUp", mainControllers.signUpPage);
router.get("/about", mainControllers.aboutUs);
router.get("/forgot", mainControllers.forgot);
router.get("/dashboard", mainControllers.dashboard);
router.post("/postUser", mainControllers.postUserData);
router.post("/log", mainControllers.login);
router.get("/tools", mainControllers.tools);
// router.post("/tool", mainControllers.tool);
// router.post("/upload", upload.single("file"), async (req, res) => {
//   if (req.file === undefined) return res.send("you must select a file.");
//   const imgUrl = `http://localhost:3000/file/${req.file.filename}`;
//   return res.send(imgUrl);
// });
module.exports = router;
