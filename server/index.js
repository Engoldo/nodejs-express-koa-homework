const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const fs = require("fs");
const flash = require("connect-flash");
const storage = require("./models/storage");
const { error, errorHandler } = require("./middlewares")
const PORT = 8080;

storage.init();
let app = express();

app.set("views", path.join(__dirname, "..", "source", "template", "pages"));
app.set("view engine", "pug");

let upload = path.join("./public", "upload");

if (!fs.existsSync(upload)) fs.mkdirSync(upload);

app.use(
  session({
    secret: "nodesecret",
    key: "sessionkey",
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 10 * 60 * 1000
    },
    saveUninitialized: false,
    resave: false
  })
);
app.use(flash());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", require("./routes"));

app.use(error);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listen port ${PORT}`);
});
