import "./config";
import app from "./app";
import "./database";
require("./config/passport");

app.listen(process.env.PORT);
console.log("Server on port", process.env.PORT);
