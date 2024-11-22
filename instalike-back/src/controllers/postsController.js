import fs from "fs";
import { validationResult, body } from "express-validator"; // Importando funções do express-validator

// Importa as funções do model de posts.
import {
  atualizaPost,
  buscarPostPorId,
  criarPost,
  deletaPost,
  getTodosPosts,
} from "../Models/postsModels.js";
import { validationData } from "../middleware/postsValidator.js";

// Define o controller para a rota GET /api.
export async function boasVindas(req, res) {
  // Envia uma mensagem de boas-vindas com status 200.
  res.status(200).send("Boas vindas a imersão!");
}

// // Define o controller para a rota GET /posts.
// export async function listarPosts(req, res) {
//   // Chama a função getTodosPosts para obter todos os posts.
//   const posts = await getTodosPosts();
//   // Envia os posts como resposta em formato JSON com status 200.
//   res.status(200).json(posts);
// }

// Define o controller para a rota GET /posts.
export async function listarPosts(req, res) {
  try {
    // Extrai os parâmetros de paginação da query string.
    const page = parseInt(req.query.page) || 1; // Página atual (padrão 1)
    const limit = parseInt(req.query.limit) || 10; // Limite de posts por página (padrão 10)

    // Calcula o número de posts a serem ignorados (skip).
    const skip = (page - 1) * limit;

    // Chama a função getTodosPosts para obter todos os posts com paginação.
    const posts = await getTodosPosts(skip, limit);

    // Obtem o total de posts
    const totalPosts = await colecao.countDocuments();

    // Retorna os posts, o total de posts e informações de paginação.
    res.status(200).json({
      posts,
      total: totalPosts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit)
    });
  } catch (error) {
    // Lida com erros durante a busca de posts.
    console.error(error.message);
    res.status(500).send({ mensagem: "Erro ao obter posts!" });
  }
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
  // Validação usando express-validator.
  const errors = validationData(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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
    res.status(500).json({ Erro: "Falha na requisição" });
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
    categoria: "",
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
    res.status(500).json({ Erro: "Falha na requisição" });
  }
}

// Define o controller para a rota PUT /posts/:id.
export async function atualizarPost(req, res) {
  // Validação usando express-validator (apenas para os campos enviados)
  const errors = validationData(req, false);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Extrai o ID do post dos parâmetros da requisição.
    const paramId = req.params.id;
    // Extrai o corpo da requisição com os dados do post a ser atualizado.
    const novoPost = req.body;

    // Verifica se uma nova imagem foi enviada na requisição.
    if (req.file) {
      // Se uma nova imagem foi enviada, atualiza a URL da imagem no objeto novoPost.
      novoPost.imageurl = req.file.originalname;
    }

    // Chama a função atualizaPost do model para atualizar o post no banco de dados.
    const postAtualizado = await atualizaPost(paramId, novoPost);

    // Verifica se o post foi encontrado.
    if (postAtualizado.matchedCount === 0) {
      // Se o post não for encontrado, retorna um erro 404 (Not Found).
      res.status(404).json({ message: "Post não encontrado" });
      return;
    }

    // Verifica se alguma atualização foi feita no post.
    if (postAtualizado.modifiedCount === 0 && !req.file) {
      // Se nenhuma atualização foi feita (nem nos dados, nem na imagem), retorna um status 202 (Accepted)
      // indicando que a requisição foi aceita, mas nenhuma alteração foi realizada.
      res.status(202).json({ message: "Nenhuma atualização para o Post" });
      return;
    }

    // Se uma nova imagem foi enviada, renomeia o arquivo com o ID do post.
    if (req.file) {
      // Constrói o novo nome do arquivo com o ID do post e a extensão .png
      const imagemAtualizada = `uploads/${paramId}.png`;
      // Renomeia o arquivo.
      fs.renameSync(req.file.path, imagemAtualizada);
    }

    // Retorna um status 200 (OK) e uma mensagem de sucesso.
    res.status(200).json({ message: "Post atualizado com sucesso" });
  } catch (erro) {
    // Se ocorrer um erro durante a atualização, loga o erro no console.
    console.error(erro.message);
    // Retorna um erro 500 (Internal Server Error).
    res.status(500).json({ Erro: "Falha na requisição" });
  }
}

export async function deletarPost(req, res) {
  try {
    const paramId = req.params.id;
    const postDeletado = await deletaPost(paramId);

    if (postDeletado.deletedCount === 0) {
      res.status(404).json({ message: "Post não encontrado" });
      return;
    }

    res.status(200).json({ message: "Post deletado com sucesso" });
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({ Erro: "Falha na requisição" });
  }
}
