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

module.exports = router;
