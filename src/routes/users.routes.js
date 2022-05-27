import { Router } from "express";
import vacante from "../models/vacante";
import item from "../models/newItem";
import postulante from '../models/newPostulante'
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

//register and save vacante

router.get("/users/postular", (req, res) => {
  res.render("users/apply");
});


router.post("/rh/registerPostulante/add", async (req, res) => {
  try {
    const { name, fatherLastName, motherLastName, phone,email,cv } = req.body;
    const postulante = new vacante({
      name,
      fatherLastName,
      motherLastName,
      phone,
      email,
      cv
    });
    const posSaved = await postulante.save();
    console.log(posSaved);
    res.redirect("/rh/postulantes");
  } catch (error) {
    console.log(error);
  }
});

//delete item
router.delete("/rh/postulante/delete/:id", async (req, res) => {
  await postulante.findByIdAndDelete(req.params.id);
  res.redirect("/rh/postulantes");
});

//show postulantes
router.get("/rh/postulantes", async (req, res) => {
  const postulantes = await postulante.find().lean().sort({ name: "desc" });
  console.log(postulantes);
  res.render("almacen/items", { postulantes: postulantes });
});

export default router;
