import express from "express";

const app = express();
app.use(express.json());
const port = 3000;

const posts = [
  {
    id: 1,
    descricao: "Uma foto teste",
    imagem: "https://placecats.com/millie/300/150",
  },
  {
    id: 2,
    descricao: "Gato brincando com um novelo de lã",
    imagem: "https://placecats.com/millie/300/150",
  },
  {
    id: 3,
    descricao: "Paisagem com um gato",
    imagem: "https://placecats.com/millie/300/150",
  },
  {
    id: 4,
    descricao: "Gato preto em uma noite de lua cheia",
    imagem: "https://placecats.com/millie/300/150",
  },
  {
    id: 5,
    descricao: "Gato dormindo em uma caixa",
    imagem: "https://placecats.com/millie/300/150",
  },
  {
    id: 6,
    descricao: "Gato curioso olhando para a câmera",
    imagem: "https://placecats.com/millie/300/150",
  },
];

app.listen(port, () => {
  console.log(`Servidor escutando na porta ${port}...`);
});

function buscarPostPorId(id) {
  return posts.findIndex((post) => {
    return post.id === Number(id);
  });
}

function buscarPostPorDescricao(descricao) {
  return posts.findIndex((post) => {
    return (
      post.descricao.toLowerCase().trim() === descricao.toLowerCase().trim()
    );
  });
}

app.get("/api", (req, res) => {
  res.status(200).send("Boas vindas a imersão!");
});

app.get("/posts", (req, res) => {
  // /posts?descricao=gato
  const { descricao } = req.query;
  let resultado = posts;
  if (descricao) {
    resultado = posts.filter((post) =>
      post.descricao.toLowerCase().includes(descricao.toLocaleLowerCase())
    );
  }
  res.status(200).json(resultado);
});

app.get("/post/:id", (req, res) => {
  const paramId = req.params.id;
  const index = buscarPostPorId(paramId);
  if (index >= 0) {
    res.status(200).json(posts[index]);
  } else {
    res.status(404).send({ mensagem: `Post "${paramId}" não encontrado!` });
  }
});

// Exercícios:
// Em vez de usar um ID numérico, faça com que a rota aceite um parâmetro de descrição do post.
// Assim, quando você acessar a rota, por exemplo, /posts/gato fazendo ioga, o servidor deve retornar o post que contém essa descrição.
// Para isso, você precisará:
// Modificar a rota para aceitar um parâmetro de descrição.
// Criar uma função que busque o post no array de posts com base na descrição.
// Retornar o post correspondente, se encontrado, ou um status 404 se não existir.

app.get("/post/descricao/:descricao", (req, res) => {
  const paramDescricao = req.params.descricao;
  const index = buscarPostPorDescricao(paramDescricao);
  if (index >= 0) {
    res.status(200).json(posts[index]);
  } else {
    res
      .status(404)
      .send({ mensagem: `Post "${paramDescricao}" não encontrado!` });
  }
});

// Adicionar um Novo Post:
// Crie uma rota POST /posts que permita adicionar um novo post ao array de posts.
// O corpo da requisição deve conter a descrição e o link da imagem.
// Após adicionar, retorne o novo post com um status 201.
app.post("/posts", (req, res) => {
  const { descricao, imagem } = req.body;
  const novoPost = {
    id: posts.length + 1,
    descricao: descricao,
    imagem: imagem,
  };
  posts.push(novoPost);
  res.status(201).json(novoPost);
});

// Atualizar um Post Existente:
// Implemente uma rota PUT /posts/:id que permita atualizar a descrição e o link da imagem de um post existente.
// Utilize o ID para identificar qual post deve ser atualizado.
// Retorne o post atualizado ou um status 404 se o post não for encontrado.
app.put("/posts/:id", (req, res) => {
  const paramId = req.params.id;
  const index = buscarPostPorId(paramId);
  if (index >= 0) {
    const { descricao, imagem } = req.body;
    posts[index] = {
      id: Number(paramId),
      descricao: descricao,
      imagem: imagem,
    };
    res.status(200).json(posts[index]);
  } else {
    res.status(404).send({ mensagem: `Post "${paramId}" não encontrado!` });
  }
});

// Deletar um Post:
// Crie uma rota DELETE /posts/:id que permita deletar um post específico do array com base no ID.
// Retorne um status 204 (sem conteúdo) se a exclusão for bem-sucedida ou um status 404 se o post não for encontrado.
app.delete("/posts/:id", (req, res) => {
  const paramId = req.params.id;
  const index = buscarPostPorId(paramId);
  if (index >= 0) {
    posts.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send({ mensagem: `Post "${paramId}" não encontrado!` });
  }
});

// Listar Todos os Posts:
// Modifique a rota GET /posts para que ela retorne todos os posts,
// mas adicione uma funcionalidade que permita filtrar os posts por uma palavra-chave na descrição.
// Por exemplo, se a URL for /posts?descricao=gato, deve retornar apenas os posts que contêm "gato" na descrição.

// Contar Posts:
// Crie uma rota GET /posts/count que retorne a quantidade total de posts disponíveis no array.
// Isso pode ser feito utilizando a propriedade length do array.
app.get("/posts/count", (req, res) => {
  res.status(200).send(`Quantidade total de posts: ${posts.length}`);
});
