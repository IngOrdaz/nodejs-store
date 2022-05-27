import { Router } from "express";
import vacante from "../models/vacante";
import item from "../models/newItem";
const passport = require("passport");
const router = Router();

router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/users/signin", (req, res) => {
  res.render("users/signin");
});

router.post("/users/login", passport.authenticate('local',{
  successRedirect:'/rh',
  failureRedirect:'/login',
  failureFlash: true
}));

router.get("/user/vacantes", async (req, res) => {
  const vacantes = await vacante.find().lean().sort({ date: "desc" });
  console.log(vacantes);
  res.render("users/bolsaTrabajo", { vacantes: vacantes });
});

router.get("/user/store", async (req, res) => {
  const prod = await item.find().lean().sort({ nameItem: "desc" });
  console.log(prod);
  res.render("users/store", { prod: prod });
});

export default router;
