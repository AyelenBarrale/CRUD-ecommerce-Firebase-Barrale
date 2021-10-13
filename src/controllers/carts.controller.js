import { db } from "../app.js";
import admin from "firebase-admin";

export async function createCart(req, res) {
  const { userName } = req.body;
  try {
    const cart = {
      userName: userName,
      productList: [],
    };
    const newDoc = await db.collection("carritos").add(cart);
    res.status(201).send(`Carrito nuevo creado: ${newDoc.id}`);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function getCart(req, res) {
  const { id } = req.params;
  try {
    const doc = db.collection("carritos").doc(id);
    const carrito = await doc.get();
    const response = carrito.data();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function deleteCart(req, res) {
  const { id } = req.params;
  try {
    const doc = db.collection("carritos").doc(id);
    await doc.delete();
    res.status(200).send("Carrito eliminado");
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function postProdsCart(req, res) {
  const { id } = req.params;
  const prodId = req.body.id;
  try {
    const docProd = db.collection("productos").doc(prodId);
    const prod = await docProd.get();
    const producto = prod.data();

    const docCart = db.collection("carritos").doc(id);

    const unionCart = await docCart.update({
      productList: admin.firestore.FieldValue.arrayUnion(producto),
    });

    console.log(unionCart);

    res.status(200).send("Producto añadido");
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function deleteProductCart(req, res) {
  const cartId = req.params.id;
  const id_prod = req.params.id_prod;

  try {
    const docCart = db.collection("carritos").doc(cartId);

    const docProd = db.collection("productos").doc(id_prod);
    const prod = await docProd.get();
    const producto = prod.data();
    console.log(producto);

    const removeProd = await docCart.update({
      productList: admin.firestore.FieldValue.arrayRemove(producto),
    });

    console.log(removeProd);

    res.status(200).send("producto eliminado del carrito");
  } catch (error) {
    res.status(400).send(error.message);
  }
}
