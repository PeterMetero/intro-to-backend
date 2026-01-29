import { Router } from "express";
import { LoginUser, LogoutUser, registerUser } from "../controllers/user.controller.js";

const router = Router();
// Define user-related routes here

router.route('/register').post(registerUser);
router.route('/login').post(LoginUser);
router.route('/logout').post(LogoutUser);

export default router;