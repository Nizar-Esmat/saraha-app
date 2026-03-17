import { Router } from "express";
import * as userService from "./user.service.js"
import { isAuthentecate } from "../../middlewares/auth.middleware.js";
import asyncHandler from "../../utils/async-handler.js";
const router = Router();

router.get("/", isAuthentecate, asyncHandler(userService.getMe));
export default router;
