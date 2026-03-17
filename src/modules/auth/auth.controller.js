import { Router } from "express";
import * as authService from "./auth.service.js";
import asyncHandler from "../../utils/async-handler.js";

const router = Router();

router.post("/register", asyncHandler(authService.register));
router.post("/login", asyncHandler(authService.login));

router.get("/verify/:token", asyncHandler(authService.verify));
export default router;
