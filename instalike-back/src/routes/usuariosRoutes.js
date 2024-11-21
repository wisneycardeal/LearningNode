import express from "express";
import { listarUsuarios } from "../controllers/usuariosController.js";

const usuariosRoutes = (app) => {
  // Configura o Express para analisar requisições com corpo JSON.
  app.use(express.json());
  // Define a rota GET para "/usuarios"
  app.get("/usuarios", listarUsuarios);
};

export default usuariosRoutes;