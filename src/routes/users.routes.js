import { Router } from "express";
import vacante from "../models/vacante";
const router = Router();

router.get("/login", (req, res) => {
    res.render("login");
  });


router.get("/user/store", (req, res) => {
  res.render("users/store");
});

//registrar productos
router.get("/user/vacantes", async (req, res) => {
  const vacantes = await vacante.find().lean().sort({ date: "desc" });
  console.log(vacantes);
  res.render("users/bolsaTrabajo", { vacantes: vacantes });
});

//register and save vacantes
router.post("/rh/registerVacante/add", async (req, res) => {
  try {
    const { experiencia, job, salary, description } = req.body;
    const addVacante = new vacante({
      experiencia,
      job,
      salary,
      description,
    });
    const vacanteSaved = await addVacante.save();
    console.log(vacanteSaved);
    req.flash("success_msg", "Vacante Agregada Con Éxito");
    res.redirect("/rh/vacantes");
  } catch (error) {
    console.log(error);
  }
});

//show vacante
router.get("/rh/vacantes", async (req, res) => {
  const vacantes = await vacante.find().lean().sort({ date: "desc" });
  console.log(vacantes);
  res.render("RH/vacante", { vacantes: vacantes });
});


  
export default router;