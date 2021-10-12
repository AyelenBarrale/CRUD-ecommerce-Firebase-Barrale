import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import { prodsRouter, cartsRouter } from "./routers/index.js";
import admin from "firebase-admin";

// Initializations
const app = express();
admin.initializeApp({
  credential: admin.credential.cert("./permissions.json"),
  databaseURL: "https://ecommerce-db-final.firebaseio.com",
});

const db = admin.firestore();

console.log("Connected!");

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/productos", prodsRouter.router);
app.use("/api/carrito", cartsRouter.router);

export { app };
export { db };
