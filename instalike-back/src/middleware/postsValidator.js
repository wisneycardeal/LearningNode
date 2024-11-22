import { validationResult, body } from "express-validator"; // Importando funções do express-validator

export async function validationData(req, validateAllFields = true) {
  // Validação usando express-validator
  if (req.body.descricao || validateAllFields) {
    await body("descricao").notEmpty().withMessage("Descrição não pode ser vazia").run(req);
  }
  if (req.body.categoria || validateAllFields) {
    await body("categoria").notEmpty().withMessage("Categoria não pode ser vazia").run(req);
  }
  await body("alt").custom((value, { req }) => {
    if (req.body.imageurl && !value) {
      throw new Error("Alt é obrigatório quando imageurl é fornecida");
    }
    return true;
  }).run(req);

  const errors = validationResult(req);

  return errors;
}