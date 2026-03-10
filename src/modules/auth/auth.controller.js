import { Router } from "express";
import * as authService from "./auth.service.js";

const router = Router();

router.post("/register", authService.register);
router.post("/login", authService.login);

router.get("/verify/:token", authService.verify);
export default router;
