import express from "express";
import { prodsController } from "../controllers/index.js";

const router = new express.Router();

//Middlewares
//import {isAdmin} from "../middlewares/adminMiddleware.js";

router.get("/", prodsController.getProducts);
router.get("/:id?", prodsController.getProductById);
router.post("/", /* isAdmin, */ prodsController.createProduct);
router.put("/:id", /* isAdmin, */ prodsController.updateProduct);
router.delete("/:id", /* isAdmin, */ prodsController.deleteProduct);

export { router };
