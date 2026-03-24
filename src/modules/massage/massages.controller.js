import Router from "express";
import * as massagesService from "./massages.service.js"
import asyncHandler from "../../utils/error/async-handler.js";
import * as mv from "./massages.validation.js"
import { isValid } from "../../middlewares/validation.middleware.js";
import { isAuthentecate } from "../../middlewares/auth.middleware.js";
const router = Router();

router.post("/", isValid(mv.massagesSchema) ,  asyncHandler(massagesService.sendMassage));
router.get("/",isAuthentecate , asyncHandler(massagesService.getMassages));
router.delete("/:id",isAuthentecate , isValid(mv.deleteMassage)  , asyncHandler(massagesService.deleteMassage));
export default router;