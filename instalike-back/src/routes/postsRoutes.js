import express from "express";
import { boasVindas, listarPostPorId, listarPosts } from "../controllers/postsController.js";

const routes = (app) => {
  // Configura o Express para analisar requisições com corpo JSON.
  app.use(express.json());

  // Define a rota GET para a raiz "/api".
  app.get("/api", boasVindas);

  // Define a rota GET para "/posts".
  app.get("/posts", listarPosts);

  // Define a rota GET para "/post/:id".
  app.get("/post/:id", listarPostPorId);
};

export default routes;
