// Importa o módulo express para criar e gerenciar o servidor.
import express from "express";
import routes from "./src/routes/postsRoutes.js";

// Cria uma instância do aplicativo Express.
const app = express();
// Define a porta em que o servidor irá escutar.
const port = 3000;
routes(app);

// Inicia o servidor na porta especificada e exibe uma mensagem no console.
app.listen(port, () => {
  console.log(`Servidor escutando na porta ${port}...`);
});