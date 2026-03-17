import dbConnect from "./db/connections.js";
import authController from "./modules/auth/auth.controller.js";
import userController from "./modules/users/user.controller.js";
const bootStrap = async (app, express) => {
  app.use(express.json());

  await dbConnect();
  app.get("/", (req, res , next) => {
    res.send("hello world");
  });
  app.use("/auth", authController);
  app.use("/user", userController);
  app.use((req, res , next) => {
    return next(new Error("route not found" , { cause: 404 }));
  });

  app.use((error, req, res, next) => {
    return res.status(error.cause || 500).json({ status: false, massage: error.message , stack : error.stack });
  })
};

export default bootStrap;