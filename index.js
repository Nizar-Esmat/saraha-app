import express from "express";
import bootStrap from "./src/app.controller.js";

const app = express();


bootStrap(app , express)

app.listen(3000, () => {
    console.log("server is running on port 3000");
});