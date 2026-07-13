const express = require("express");
const path = require("path");

const indexRouter = require("./routes/indexRouter");

const app = express();
const PORT = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});