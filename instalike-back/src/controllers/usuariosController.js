import { getTodosUsuarios } from "../Models/usuariosModel.js";

export async function listarUsuarios(req, res) {
  try {
    const usuarios = await getTodosUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
}
