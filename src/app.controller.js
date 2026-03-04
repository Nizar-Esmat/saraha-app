import dbConnect from "./db/connections.js";

const bootStrap = async (app, express) => {
  app.use(express.json());

  await dbConnect();
  app.get("/", (req, res) => {
    res.send("hello world");
  });

  app.use((req, res) => {
    res.status(404).send("not found");
  });
};

export default bootStrap;
