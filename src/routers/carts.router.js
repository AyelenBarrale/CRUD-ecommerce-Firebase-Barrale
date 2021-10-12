import express from "express";
import { cartsController } from "../controllers/index.js";

const router = new express.Router();

router.get("/:id/productos", cartsController.getCart);
router.post("/", cartsController.createCart);
router.delete("/:id", cartsController.deleteCart);
router.post("/:id/productos", cartsController.postProdsCart);
router.delete("/:id/productos/:id_prod", cartsController.deleteProductCart);

export { router };
