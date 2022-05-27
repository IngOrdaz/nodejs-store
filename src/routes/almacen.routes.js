import { Router } from "express";
import item from "../models/newItem";
const router = Router();

router.get("/almacen", (req, res) => {
  res.render("almacen/indexAlmacen");
});

router.get("/almacen/registerItem", (req, res) => {
  res.render("almacen/registerItems");
});

//register and save productos
router.post("/almacen/registerItem/add", async (req, res) => {
  try {
    const { itemName, cantidad, price, code } = req.body;
    const addItem = new item({
      itemName,
      cantidad,
      price,
      code,
    });
    const itemSaved = await addItem.save();
    console.log(itemSaved);
    req.flash("success_msg", "Producto Agregado Con Éxito");
    res.redirect("/almacen/items");
  } catch (error) {
    console.log(error);
  }
});


router.get("/almacen/store", async(req, res) => {
  const productos = await item.find().lean().sort({ nameItem: "desc" });
  console.log(productos);
  res.render("almacen/storeAlmacen",{productos:productos});
});

//show producto
router.get("/almacen/items", async (req, res) => {
  const items = await item.find().lean().sort({ nameItem: "desc" });
  console.log(items);
  res.render("almacen/items", { items: items });
});

//delete item
router.delete("/almacen/item/delete/:id", async (req, res) => {
  await item.findByIdAndDelete(req.params.id);
  res.redirect("/almacen/items");
});

//edit vacante
router.get("/almacen/editItem/:id", async (req, res) => {
  const itm = await item.findById(req.params.id).lean();
  console.log(itm);
  res.render("almacen/editItem", { itm });
});

router.put("/almacen/edit-item/:id", async (req, res) => {
  const { itemName, price, cantidad, code } = req.body;
  await item.findByIdAndUpdate(req.params.id, {
    itemName,
    price,
    cantidad,
    code,
  });
  res.redirect("/almacen/items");
});

export default router;
