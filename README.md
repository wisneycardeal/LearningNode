# Estudos - Alura - Imersão Dev Back End - Node.js, APIs e Servidores com Google Gemini

Aula 03
Exercícios:

Crie a coleção "usuarios" no MongoDB Atlas.
Cada documento dessa coleção deve conter os seguintes campos:
nome (string)
email (string)
senha (string)
dataCriacao (data, que pode ser a data atual)
Implemente uma função no seu servidor que busque todos os usuários dessa coleção e retorne os dados em formato JSON quando a rota /usuarios for acessada.

Adicionar um novo campo na coleção "posts":
Atualize a coleção "posts" para incluir um campo chamado categoria (string).
Crie uma função no postsController que permita adicionar um novo post com a categoria e retorne o post criado.

Criar uma rota para buscar posts por categoria:
Implemente uma nova rota /posts/categoria/:categoria que retorne todos os posts de uma categoria específica.
Utilize a função find do MongoDB para filtrar os posts pela categoria.

Implementar a funcionalidade de atualização de posts:
Crie uma nova rota /posts/:id que permita atualizar um post existente.
A função deve receber os novos dados no corpo da requisição e atualizar o post correspondente no banco de dados.

Adicionar validações nos dados:
Utilize uma biblioteca como Joi ou express-validator para validar os dados que estão sendo enviados nas requisições para criar e atualizar posts.
Certifique-se de que os campos obrigatórios estão sendo preenchidos corretamente.

Refatorar o código para melhorar a organização:
Crie uma nova pasta chamada middlewares e mova qualquer lógica de validação ou autenticação que você criar para lá.