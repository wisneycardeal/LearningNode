// Importa a função para conectar ao banco de dados.
import conectarAoBanco from "../config/dbConfig.js";

// Chama a função para conectar ao banco de dados e armazena a conexão.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Define uma função assíncrona para buscar todos os usuários do banco de dados.
export async function getTodosUsuarios() {
    // Seleciona o banco de dados "imersao-instabytes".
    const db = conexao.db("imersao-instabytes");
    // Seleciona a coleção "usuarios".
    const colecao = db.collection("usuarios");
    // Busca todos os documentos da coleção e os converte em um array.
    const usuarios = await colecao.find({}).toArray();
    // Retorna o array de usuarios.
    return usuarios;
  }