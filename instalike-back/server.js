// Importa o módulo express para criar e gerenciar o servidor.
import express, { application } from "express";
import routes from "./src/routes/postsRoutes.js";

// Define a porta em que o servidor irá escutar.
const port = 3000;

// Cria uma instância do aplicativo Express.
const app = express();
app.use(express.static("uploads"));
app.use(express.static("src"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
routes(app);

// Inicia o servidor na porta especificada e exibe uma mensagem no console.
app.listen(port, () => {
  console.log(`Servidor escutando na porta ${port}...`);
});