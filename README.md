# Estudos - Alura - Imersão Dev Back End - Node.js, APIs e Servidores com Google Gemini

## Aula 04 Exercícios

### Criar uma nova rota para permitir que os usuários possam atualizar um post existente
    - Crie uma nova rota: A rota deve ser do tipo PUT e pode ser chamada de /posts/:id, onde :id é o identificador do post que você deseja atualizar.
    - Controller: No controller, crie uma função chamada atualizarPost. Essa função deve:
    - Receber o id do post a ser atualizado.
    - Receber os novos dados do post através do req.body.
    - Usar o método updateOne do MongoDB para atualizar o post correspondente.
    - Tratamento de Erros: Certifique-se de implementar um tratamento de erros usando try e catch, assim como foi feito na aula.
    - Teste: Utilize o Postman ou o Thunder Client para testar a nova rota, enviando um PUT com os dados que você deseja atualizar.

### Criar uma Rota para Deletar Posts
    - Crie uma nova rota do tipo DELETE chamada /posts/:id.
    - No controller, implemente uma função chamada deletarPost que:
    - Receba o id do post a ser deletado.
    - Utilize o método deleteOne do MongoDB para remover o post correspondente.
    - Retorne uma mensagem de sucesso ou erro.
    
### Listar Todos os Posts
    - Crie uma rota do tipo GET chamada /posts.
    - No controller, implemente uma função chamada listarPosts que:
    - Utilize o método find do MongoDB para buscar todos os posts.
    - Retorne a lista de posts em formato JSON.

### Atualizar a Imagem de um Post
    - Modifique a rota de atualização que você criou anteriormente para permitir que o usuário também envie uma nova imagem.
    - Utilize o multer para fazer o upload da nova imagem e renomeie-a com o insertedId do post, assim como foi feito na aula.

### Validação de Dados
    - Antes de criar ou atualizar um post, implemente uma validação para garantir que os campos obrigatórios (como descrição, URL e alt) estejam presentes.
    - Se algum campo estiver faltando, retorne um erro com uma mensagem apropriada.

### Implementar Paginação
    - Na rota de listagem de posts, implemente a funcionalidade de paginação. 
    - Por exemplo, você pode aceitar parâmetros de consulta ?page=1&limit=10 para retornar apenas um número específico de posts por vez.

> [!NOTE] 
> Esses exercícios vão te ajudar a consolidar os conceitos de rotas, controllers, manipulação de dados no MongoDB e boas práticas de programação! Divirta-se programando! 😊