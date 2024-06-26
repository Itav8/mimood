import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";
import { createNewUser, login, logout } from "./handlers/user";

const app = express();

const corOptions = {
  origin: ["http://localhost:5174", "https://dawkc68fgwyft.cloudfront.net"],
  credentials: true,
};

app.use(cors(corOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200);
  res.send("Hello World!");
});

app.use("/api", router);

app.post("/api/user", createNewUser);
app.post("/api/login", login);
app.delete("/api/logout", logout);

export default app;
