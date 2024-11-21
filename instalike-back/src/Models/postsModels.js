// Importa a função para conectar ao banco de dados.
import conectarAoBanco from "../config/dbConfig.js";


// Chama a função para conectar ao banco de dados e armazena a conexão.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Define uma função assíncrona para buscar todos os posts do banco de dados.
export async function getTodosPosts() {
  // Seleciona o banco de dados "imersao-instabytes".
  const db = conexao.db("imersao-instabytes");
  // Seleciona a coleção "posts".
  const colecao = db.collection("posts");
  // Busca todos os documentos da coleção e os converte em um array.
  const posts = await colecao.find({}).toArray();
  // Retorna o array de posts.
  return posts;
}

// Define uma função assíncrona para buscar um post pelo ID.
export async function buscarPostPorId(id) {
  // Chama a função para buscar todos os posts.
  const posts = await getTodosPosts();
  // Busca o post com o ID correspondente.
  const post = posts.find((post) => {
    return post._id.toString() === id; // Assuming your ID is stored as a string
  });
  //Retorna o post ou null se não encontrado.
  return post;
}
