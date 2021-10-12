import { db } from "../app.js";

export async function createProduct(req, res) {
  const { nombre, codigo, descripcion, precio, foto, stock } = req.body;
  try {
    await db.collection("productos").doc().create({
      nombre: nombre,
      codigo: codigo,
      descripcion: descripcion,
      precio: precio,
      foto: foto,
      stock: stock,
    });
    res.status(200).send("Producto creado");
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function getProducts(req, res) {
  try {
    const query = db.collection("productos");
    const querySnapshot = await query.get();
    const docs = querySnapshot.docs;

    const response = docs.map((doc) => ({
      id: doc.id,
      nombre: doc.data().nombre,
      codigo: doc.data().codigo,
      descripcion: doc.data().descripcion,
      precio: doc.data().precio,
      foto: doc.data().foto,
      stock: doc.data().stock,
    }));

    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function getProductById(req, res) {
  const { id } = req.params;
  try {
    const doc = db.collection("productos").doc(id);
    const producto = await doc.get();
    const response = producto.data();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function deleteProduct(req, res) {
  const { id } = req.params;
  try {
    const doc = db.collection("productos").doc(id);
    await doc.delete();
    res.status(200).send("Producto eliminado");
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function updateProduct(req, res) {
  const { id } = req.params;
  const { body } = req;

  try {
    const doc = db.collection("productos").doc(id);
    await doc.update(body);

    res.status(200).send("Producto actualizado");
  } catch (error) {
    res.status(400).send(error.message);
  }
}
