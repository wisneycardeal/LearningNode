import { body, validationResult } from "express-validator";

export async function ValidateParams(req) {
    await body('descricao').notEmpty().withMessage('Descrição é obrigatório').run(req);
    await body('categoria').notEmpty().withMessage('Categoria é obrigatória').run(req);
    await body('imgurl').isURL().withMessage('URL da imagem inválida').optional({ nullable: true }).run(req);
    await body('alt').optional({ nullable: true }).run(req);
    const errors = validationResult(req);    
    return errors;
}