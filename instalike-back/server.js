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

app.get("/api", (req, res) => {
  res.status(200).send("Boas vindas a imersão!");
});

app.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

app.get("/post/:id", (req, res) => {
    const paramId = req.params.id;
    const index = buscarPostPorId(paramId);
    if (index >= 0) {
        res.status(200).json(posts[index]);
    } else {
        res.status(404).send({mensagem: `Post ${paramId} não encontrado!`});        
    }
});
