import express from "express";
import {
  atualizarPost,
  boasVindas,
  inserirPost,
  listarPostPorCategoria,
  listarPostPorId,
  listarPosts,
} from "../controllers/postsController.js";

const routes = (app) => {
  // Configura o Express para analisar requisições com corpo JSON.
  app.use(express.json());

  // Define a rota GET para a raiz "/api".
  app.get("/api", boasVindas);

  // Define a rota GET para "/posts".
  app.get("/posts", listarPosts);

  // Define a rota GET para "/post/:id".
  app.get("/posts/:id", listarPostPorId);

  app.post("/posts", inserirPost);

  app.get("/posts/categoria/:categoria", listarPostPorCategoria);

  app.put("/posts/:id", atualizarPost);
};

export default routes;
