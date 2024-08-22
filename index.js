process.on("uncaughtException", (err) => {
  console.log("err in write code", err);
});
const express = require("express");
const conct = require("./database/conct");
require("dotenv").config({ path: "./config/.env" });
const morgan = require("morgan");
const Apperr = require("./utils/Apperr");
const { golbalmiddlware } = require("./utils/golbalmiddlewareErr");
const { app_use } = require("./utils/app_use");
const app = express();
app.use(morgan("dev"));
app.use(express.static("uploads"));
app.use(express.json());
const port = process.env.PORT || 3000;
conct();
app.get("/", (req, res) => res.send("Hello World!"));
app.get("/test", (req, res) => res.send("tesst secc"));
app.use("/category", require("../src/category/api.category"));
app_use(app);
app.all("*", (req, res, next) => {
  next(new Apperr("not found the url", 404));
});

app.use(golbalmiddlware);

app.listen(3000 || process.env.PORT, () =>
  console.log(`Example app listening on port ${port}!`)
);
process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection", err);
});
