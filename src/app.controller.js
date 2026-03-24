import dbConnect from "./db/connections.js";
import authController from "./modules/auth/auth.controller.js";
import userController from "./modules/users/user.controller.js";
import massagesController from "./modules/massage/massages.controller.js"; 
import { globalError } from "./utils/error/global-error.js";
import { notFOund } from "./utils/error/not-found.js";
const bootStrap = async (app, express) => {
  app.use(express.json());

  await dbConnect();
  app.get("/", (req, res, next) => {
    res.send("hello world");
  });
  app.use("/auth", authController);
  app.use("/user", userController);
  app.use("/massages", massagesController);


  app.use(notFOund);
  app.use(globalError)
};

export default bootStrap;