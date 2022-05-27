import express from "express";
import indexRoutes from "./routes/index.routes";
import usersRoutes from "./routes/users.routes";
import rhRoutes from "./routes/rh.routes";
//import exphbs from 'express-handlebars'; es el de abajo pero ya no da error el de abajo
const exphbs = require("express-handlebars");
import path from "path";
import morgan from "morgan";
import exp from "constants";
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");

//init
const app = express();

//settings
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs.engine({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    usersDir: path.join(app.get("views"), "users"),
  })
);
app.set("view engine", ".hbs");

//middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "naarsee",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

//variable global
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error");
  next();
});

//Routes
app.use(indexRoutes);
app.use(usersRoutes);
app.use(rhRoutes);

//Static Files
app.use(express.static(path.join(__dirname, "public")));
export default app;
