import { Router } from "express";
import  * as userService from "./user.service.js"
import { isAuthentecate } from "../../middlewares/auth.middleware.js";
const router = Router();

router.get("/", isAuthentecate ,userService.getMe);
export default router;
