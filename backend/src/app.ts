import express from "express";
import path from "path";
import logger from "morgan";
import cors from "cors";
import RecipesRoutes from "./recipes.routes";

require("dotenv").config();

const corsOption = {
  credentials: true,
};

const app = express();

app.use(express.static(path.join(__dirname, "../public")));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const port = Number(process.env.PORT) || 8080;

app.use(cors(corsOption));
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/recipes", RecipesRoutes);
app.listen(port, () => console.log("SERVER STARTED ON PORT", +port));
