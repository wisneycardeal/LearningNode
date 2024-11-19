import express from "express";
const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log("Servidor escutando...");
});

app.get("/api", (req, res) => {
    res.status(200).send("Boas vindas a imersão!");
});

// Exercícios:
// Para simplificar, você pode armazenar os livros em um array na memória (não precisa de banco de dados para este exercício).
let livros = [];

// Crie uma nova rota chamada /livro.
// Quando essa rota for acessada, ela deve retornar um JSON com as seguintes informações:
// Título do livro
// Autor do livro
// Ano de publicação
// Gênero

app.get("/livro", (req, res) => {
    const livro = {
        id: 1,
        titulo: "O Senhor dos Anéis",
        autor: "J.R.R Tolkien",
        ano: 1954,
        genero: "Fantasia",
        sinopse: "A história de O Senhor dos Anéis de J.R.R. Tolkien gira em torno de um hobbit que é encarregado de destruir o Anel do Poder, a única coisa que impede o domínio do Senhor do Escuro."
    };

    res.status(200).send(livro);
});

// Criar uma rota para múltiplos livros:
// Crie uma nova rota chamada /livros.
// Quando essa rota for acessada, ela deve retornar um array de objetos, onde cada objeto representa um livro com as mesmas informações (título, autor, ano, gênero) que você usou no exercício anterior.
app.get("/livros", (req, res) => {
    res.status(200).send(livros);
});

// Adicionar uma nova propriedade:
// Modifique a rota /livro que você criou anteriormente para incluir uma nova propriedade chamada sinopse, que deve conter uma breve descrição do livro.

// Criar uma rota para buscar um livro específico:
// Crie uma rota chamada /livro/:id, onde :id é um parâmetro de rota.
// Quando essa rota for acessada, retorne um livro específico com base no ID fornecido. Você pode simular isso usando um array de livros que você criou no exercício anterior.
// Implementar tratamento de erro:
// Na rota /livro/:id, se o ID não corresponder a nenhum livro, retorne um status 404 com uma mensagem de erro como "Livro não encontrado".

app.get("/livro/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const livroEncontrado = livros.find(livro => livro.id === id);
    if (livroEncontrado) {
        res.status(200).send(livroEncontrado);
    } else {
        res.status(404).send({mensagem: `Livro ${id} não encontrado!`});
    }
});

// Adicionar uma rota para criar um novo livro:
// Crie uma rota POST chamada /livro que permita ao usuário enviar um novo livro (título, autor, ano, gênero, sinopse) através do corpo da requisição.
app.post("/livro", (req, res) => {
    const novoLivro = req.body;
    livros.push(novoLivro);
    res.status(201).send(novoLivro);
});