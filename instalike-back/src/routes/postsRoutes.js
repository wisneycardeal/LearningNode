import express from "express";
import multer from "multer";
import cors from "cors";

// Importa as funções do controlador de posts.
import {
  atualizarNovoPost,
  boasVindas,
  listarPostPorId,
  listarPosts,
  postarNovoPost,
  uploadImagem,
} from "../controllers/postsController.js";

const corsOptions = { 
  origin:"http://localhost:8000",
  optionsSuccessStatus: 200
}

// Configura o armazenamento do Multer para salvar arquivos de upload.
const storage = multer.diskStorage({
  // Define o destino dos arquivos de upload como a pasta 'uploads/'.
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  // Define o nome do arquivo como o nome original do arquivo enviado.
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Cria uma instância do Multer com as configurações de armazenamento definidas acima.
const uploadwindows = multer({ storage: storage });

// Cria uma instância do Multer com o destino padrão './uploads'.
const upload = multer({ dest: "./uploads" });

// Define as rotas da aplicação.
const routes = (app) => {
  // Configura o middleware para analisar o corpo das requisições como JSON.
  app.use(express.json());
  app.use(cors(corsOptions));
  
  // Define a rota GET '/api' que chama a função boasVindas.
  app.get("/api", boasVindas);

  // Define a rota GET '/posts' que chama a função listarPosts.
  app.get("/posts", listarPosts);

  // Define a rota GET '/post/:id' que chama a função listarPostPorId.
  app.get("/post/:id", listarPostPorId);

  // Define a rota POST '/posts' que chama a função postarNovoPost para criar um novo post.
  app.post("/posts", postarNovoPost);

  // Define a rota POST '/upload' que usa o middleware 'upload.single("imagem")' para lidar com o upload de uma única imagem
  // e chama a função uploadImagem.
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost);
};

// Exporta a função de rotas.
export default routes;
