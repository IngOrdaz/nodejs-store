import { Router } from "express";
import employee from "../models/newEmployee";
import vacante from "../models/vacante";
import item from "../models/newItem";
const router = Router();

//RH routes
router.get("/rh", (req, res) => {
  res.render("RH/indexRH");
});

router.get("/rh/registerEmployee", (req, res) => {
  res.render("RH/registerEmployee");
});


//profile employee
router.get("/rh/profile/:id", async (req, res) => {
  const employ = await employee.findById(req.params.id).lean();
  console.log(employ);
  res.render("RH/profileRH", { employ });
});

router.get("/rh/store", async(req, res) => {
  const prod = await item.find().lean().sort({ nameItem: "desc" });
  console.log(prod);
  res.render("RH/storeRH",{prod:prod});
});

//register and save employees
router.post("/rh/registerEmployee/add", async (req, res) => {
  try {
    const {
      name,
      fatherLastName,
      motherLastName,
      curp,
      rol,
      rfc,
      email,
      phone,
      job,
      salary,
      user,
      password,
    } = req.body;
    const addEmp = new employee({
      name,
      fatherLastName,
      motherLastName,
      curp,
      rol,
      rfc,
      email,
      phone,
      job,
      salary,
      user,
      password,
    });
    const rfcEmployee = await employee.findOne({ rfc: rfc });
    const emailEmployee = await employee.findOne({ email: email });
    const userEmployee = await employee.findOne({ user:user });
    if (rfcEmployee) {
      req.flash(
        "error_msg",
        "El RFC ya ha sido utilizado anteriormente, no se puede usar de nuevo"
      );
      res.redirect("/rh/registerEmployee");
    }
    if (emailEmployee) {
      req.flash(
        "error_msg",
        "El CORREO ya ha sido utilizado anteriormente, no se puede usar de nuevo"
      );
      res.redirect("/rh/registerEmployee");
    }
    if (userEmployee) {
      req.flash(
        "error_msg",
        "El USUARIO ya ha sido utilizado anteriormente, no se puede usar de nuevo"
      );
      res.redirect("/rh/registerEmployee");
    }
    addEmp.password = await addEmp.encryptPassword(password);
    const employeeSaved = await addEmp.save();
    console.log(employeeSaved);
    req.flash("success_msg", "Empleado Agregado Con Éxito");
    res.redirect("/rh/employees");
  } catch (error) {
    console.log(error);
  }
});

//show employees
router.get("/rh/employees", async (req, res) => {
  const employees = await employee.find().lean().sort({ date: "desc" });
  console.log(employees);
  res.render("RH/employees", { employees: employees });
});

//edit employee
router.get("/rh/editEmployee/:id", async (req, res) => {
  const employ = await employee.findById(req.params.id).lean();
  console.log(employ);
  res.render("RH/editEmployee", { employ });
});

router.put("/rh/edit-employee/:id", async (req, res) => {
  const {
    name,
    fatherLastName,
    motherLastName,
    curp,
    rol,
    rfc,
    email,
    phone,
    job,
    salary,
    user,
    password,
  } = req.body;
  await employee.findByIdAndUpdate(req.params.id, {
    name,
    fatherLastName,
    motherLastName,
    curp,
    rol,
    rfc,
    email,
    phone,
    job,
    salary,
    user,
    password,
  });
  res.redirect("/rh/employees");
});

//delete employee
router.delete("/rh/employee/delete/:id", async (req, res) => {
  await employee.findByIdAndDelete(req.params.id);
  res.redirect("/rh/employees");
});

//    ----  VACANTES  ----
router.get("/rh/registerVacante", (req, res) => {
  res.render("RH/registerVacante");
});

//register and save vacante
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

//delete vacante
router.delete("/rh/vacante/delete/:id", async (req, res) => {
  await vacante.findByIdAndDelete(req.params.id);
  res.redirect("/rh/vacantes");
});

//edit vacante
router.get("/rh/editVacante/:id", async (req, res) => {
  const vac = await vacante.findById(req.params.id).lean();
  console.log(vac);
  res.render("RH/editVacante", { vac });
});

router.put("/rh/edit-vacante/:id", async (req, res) => {
  const { experiencia, description, job, salary } = req.body;
  await vacante.findByIdAndUpdate(req.params.id, {
    experiencia,
    description,
    job,
    salary,
  });
  res.redirect("/rh/vacantes");
});



export default router;
