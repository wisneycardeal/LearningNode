import {
  atualizarPostPorId,
  buscarPostporCategoria,
  buscarPostPorId,
  getTodosPosts,
  inserirNovoPost,
} from "../Models/postsModel.js";

export async function boasVindas(req, res) {
  // Responde com uma mensagem de boas-vindas.
  res.status(200).send("Boas vindas a imersão!");
}

export async function listarPosts(req, res) {
  // Chama a função para buscar todos os posts.
  const posts = await getTodosPosts();
  // Responde com os posts em formato JSON.
  res.status(200).json(posts);
}

export async function listarPostPorId(req, res) {
  // Extrai o ID do post dos parâmetros da requisição.
  const paramId = req.params.id;
  try {
    // Busca o post pelo id.
    const post = await buscarPostPorId(paramId);
    // Verifica se o post existe
    if (post) {
      // Retorna o post encontrado
      res.status(200).json(post);
    } else {
      // Retorna erro 404 se o post não for encontrado
      res.status(404).send({ mensagem: `Post ${paramId} não encontrado!` });
    }
  } catch (error) {
    // Retorna erro 500 em caso de falha no servidor.
    res.status(500).send({ mensagem: `Erro ao obter o post ${paramId} ! ` });
  }
}

export async function inserirPost(req, res) {
  try {
    const novoPost = req.body;
    const postCriado = await inserirNovoPost(novoPost);
    res.status(201).json(postCriado);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar post" });
  }
}

export async function listarPostPorCategoria(req, res) {
  try {
    const categoria = req.params.categoria;
    const posts = await buscarPostporCategoria(categoria);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar posts por categoria" });
  }
}

export async function atualizarPost(req, res) {
  try {
    const id = req.params.id;
    const dadosAtualizados = req.body;
    const resultado = await atualizarPostPorId(id, dadosAtualizados);
    if (resultado.modifiedCount > 0) {
      res.json({ message: "Post atualizado com sucesso" });
    } else {
      res.status(404).json({ message: "Post não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar post" });
  }
}
