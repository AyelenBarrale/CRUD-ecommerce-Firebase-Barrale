const isAdmin = function (req, res, next) {
  const { body } = req;
  if (body.role === true) {
    next();
  } else {
    res.status(400).send({
      error: -1,
      descripcion:
        "ruta y acceso no autorizados para usuarios, debe ser administrador para poder acceder.",
    });
  }
};

export { isAdmin };
