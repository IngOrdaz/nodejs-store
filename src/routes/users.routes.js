import { Router } from "express";
import vacante from "../models/vacante";
const router = Router();

router.get("/login", (req, res) => {
    res.render("login");
  });


router.get("/user/store", (req, res) => {
  res.render("users/store");
});

router.get("/user/vacantes", async (req, res) => {
  const vacantes = await vacante.find().lean().sort({ date: "desc" });
  console.log(vacantes);
  res.render("users/bolsaTrabajo", { vacantes: vacantes });
});


  
export default router;