// Importa a função para conectar ao banco de dados.
import { ObjectId } from "mongodb";
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

export async function inserirNovoPost(params) {
  // Seleciona o banco de dados "imersao-instabytes".
  const db = conexao.db("imersao-instabytes");
  // Seleciona a coleção "posts".
  const colecao = db.collection("posts");
  colecao.insertOne(params);
}

export async function buscarPostporCategoria(categoria) {
  // Seleciona o banco de dados "imersao-instabytes".
  const db = conexao.db("imersao-instabytes");
  // Seleciona a coleção "posts".
  const colecao = db.collection("posts");
  const posts = await colecao.find({ categoria }).toArray();
  return posts;
}

// Define uma função assíncrona para buscar um post pelo _id.
export async function buscarPostPorId(id) {
  // Seleciona o banco de dados "imersao-instabytes".
  const db = conexao.db("imersao-instabytes");
  // Seleciona a coleção "posts".
  const colecao = db.collection("posts");
  // Busca todos os documentos da coleção e os converte em um array.
  const posts = await colecao.find({ _id: new ObjectId(id) }).toArray();
  // Retorna o array de posts.
  return posts;
}

export async function atualizarPostPorId(id, dadosAtualizados) {
  // Seleciona o banco de dados "imersao-instabytes".
  const db = conexao.db("imersao-instabytes");
  // Seleciona a coleção "posts".
  const colecao = db.collection("posts");
  colecao.updateOne({ _id: new ObjectId(id) }, { $set: dadosAtualizados }, { upsert: true });
}
