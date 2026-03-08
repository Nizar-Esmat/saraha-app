import dbConnect from "./db/connections.js";
import authController from "./modules/auth/auth.controller.js";
import userController from "./modules/users/user.controller.js";
const bootStrap = async (app, express) => {
  app.use(express.json());

  await dbConnect();
  app.get("/", (req, res) => {
    res.send("hello world");
  });
  app.use("/auth", authController);
  app.use("/user", userController);

  app.use((req, res) => {
    res.status(404).send("not found");
  });
};

export default bootStrap;
