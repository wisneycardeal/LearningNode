import fs from "fs";

// Importa as funções do model de posts.
import {
  buscarPostPorId,
  criarPost,
  getTodosPosts,
} from "../Models/postsModels.js";

// Define o controller para a rota GET /api.
export async function boasVindas(req, res) {
  // Envia uma mensagem de boas-vindas com status 200.
  res.status(200).send("Boas vindas a imersão!");
}

// Define o controller para a rota GET /posts.
export async function listarPosts(req, res) {
  // Chama a função getTodosPosts para obter todos os posts.
  const posts = await getTodosPosts();
  // Envia os posts como resposta em formato JSON com status 200.
  res.status(200).json(posts);
}

// Define o controller para a rota GET /post/:id.
export async function listarPostPorId(req, res) {
  // Extrai o ID do post dos parâmetros da requisição.
  const paramId = req.params.id;
  try {
    // Chama a função buscarPostPorId para buscar o post com o ID especificado.
    const post = await buscarPostPorId(paramId);
    // Verifica se um post foi encontrado.
    if (post) {
      // Se o post for encontrado, envia o post como resposta em formato JSON com status 200.
      res.status(200).json(post);
    } else {
      // Se o post não for encontrado, envia uma mensagem de erro com status 404.
      res.status(404).send({ mensagem: `Post ${paramId} não encontrado!` });
    }
  } catch (error) {
    // Se ocorrer um erro durante a busca, envia uma mensagem de erro com status 500.
    res.status(500).send({ mensagem: `Erro ao obter o post ${paramId} ! ` });
  }
}


// Define o controller para a rota POST /posts.
export async function postarNovoPost(req, res) {
  // Extrai o corpo da requisição contendo os dados do novo post.
  const novoPost = req.body;
  try {
    // Chama a função criarPost para criar um novo post no banco de dados.
    const postCriado = await criarPost(novoPost);
    // Envia o post criado como resposta em formato JSON com status 201 (Created).
    res.status(201).json(postCriado);
  } catch (erro) {
    // Se ocorrer um erro durante a criação do post, loga o erro no console.
    console.error(erro.message);
    // Envia uma mensagem de erro com status 500.
    res.status(500).json({ "Erro": "Falha na requisição" });
  }
}

// Define o controller para a rota POST /upload.
export async function uploadImagem(req, res) {
  // Cria um novo objeto de post com a URL da imagem. Os demais campos estão vazios, 
  // assumindo que serão preenchidos posteriormente.
  const novoPost = {
    descricao: "",
    imageurl: req.file.originalname,
    alt: "",
    categoria: ""
  };

  try {
    // Chama a função criarPost para criar um novo post com os dados da imagem.
    const postCriado = await criarPost(novoPost);
    // Constrói o novo nome do arquivo com o ID do post criado e a extensão .png.
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
    // Renomeia o arquivo de upload com o novo nome usando o ID do post.
    fs.renameSync(req.file.path, imagemAtualizada);
    // Envia o post criado como resposta em formato JSON com status 201 (Created).
    res.status(201).json(postCriado);
  } catch (erro) {
    // Se ocorrer um erro durante o upload, loga o erro no console.
    console.error(erro.message);
    // Envia uma mensagem de erro com status 500.
    res.status(500).json({ "Erro": "Falha na requisição" });
  }
}
