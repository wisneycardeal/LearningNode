// Importa a função para conectar ao banco de dados.
import exp from "constants";
import conectarAoBanco from "../config/dbConfig.js";
import { ObjectId } from "mongodb";


// Chama a função conectarAoBanco para estabelecer a conexão com o banco de dados e armazena o resultado na variável conexao.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// // Define uma função assíncrona para buscar todos os posts.
// export async function getTodosPosts() {
//   // Seleciona o banco de dados "imersao-instabytes".
//   const db = conexao.db("imersao-instabytes");
//   // Seleciona a coleção "posts" dentro do banco de dados.
//   const colecao = db.collection("posts");
//   // Busca todos os documentos da coleção "posts" e os retorna como um array.
//   const posts = await colecao.find({}).toArray();
//   // Retorna o array de posts encontrado.
//   return posts;
// }

// Define uma função assíncrona para buscar todos os posts com paginação.
export async function getTodosPosts(skip = 0, limit = 10) {
  const db = conexao.db("imersao-instabytes");
  const colecao = db.collection("posts");

  const posts = await colecao.find({})
                            .skip(skip) // Pula os primeiros 'skip' documentos.
                            .limit(limit) // Limita o número de documentos retornados.
                            .toArray();
                            
  return posts;
}

// Define uma função assíncrona para buscar um post pelo ID.
export async function buscarPostPorId(id) {
  // Chama a função getTodosPosts para obter todos os posts.
  const posts = await getTodosPosts();
  // Filtra o array de posts para encontrar o post com o ID correspondente. A função `find` retorna o primeiro elemento que satisfaz a condição.
  // É importante converter o `post._id` (que é um ObjectId)  e o parâmetro id para string antes da comparação.
  const post = posts.find((post) => {
    return post._id.toString() === id; 
  });
  // Retorna o post encontrado ou undefined se nenhum post com o ID fornecido for encontrado.
  return post;
}

// Define uma função assíncrona para criar um novo post.
export async function criarPost(novoPost) {
  // Seleciona o banco de dados "imersao-instabytes".
  const db = conexao.db("imersao-instabytes");
  // Seleciona a coleção "posts".
  const colecao = db.collection("posts");
  // Insere o novoPost na coleção "posts" e retorna o resultado da operação.
  const postCriado = await colecao.insertOne(novoPost);
  // Retorna o resultado da inserção, que contém informações como o ID do novo post criado.
  return postCriado;
}

export async function atualizaPost(id, novoPost) {
  const db = conexao.db("imersao-instabytes");
  const colecao = db.collection("posts");
  const postAtualizado = await colecao.updateOne({_id: new ObjectId(id)}, {$set: novoPost});
  return postAtualizado;
}

export async function deletaPost(id) {
  const db = conexao.db("imersao-instabytes");
  const colecao = db.collection("posts");
  const postDeletado = await colecao.deleteOne({_id: new ObjectId(id)}, {includeResultMetadata: true});
  return postDeletado;  
}