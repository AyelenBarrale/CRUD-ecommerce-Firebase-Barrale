import { db } from "../app.js";

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
    const cart = await docCart.get();
    const carrito = cart.data();

    if (!carrito.productList.includes(producto)) {
      carrito.productList.push(producto);
    } else {
      console.log("producto ya incluido en lista");
    }

    console.log(carrito);

    res.status(200).json(carrito);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function deleteProductCart(req, res) {
  const cartId = req.params.id;
  const prodId = req.params.id_prod;

  try {
    const docCart = db.collection("carritos").doc(cartId);
    const carrito = await docCart.get();
    const responseCart = carrito.data();
    console.log(responseCart);
    await responseCart.delete(prodId);

    if (!responseCart?.productos?.includes(prodId)) {
      res.status(200).send("producto eliminado del carrito");
    } else {
      res.status(400).send("el producto no se encuentra en el carrito");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}
