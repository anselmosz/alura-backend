import { ObjectId } from 'mongodb';
import ConectarAoBanco from '../config/dbConfig.js';
const conexao = await ConectarAoBanco(process.env.CONNECTION_STRING); // Conecta ao banco de dados usando a string de conexão fornecida pela variável de ambiente

// Função assíncrona para obter todos os posts de uma coleção específica
export async function getAllPosts() {
  const db = conexao.db('imersion-instabytes'); // Obtém uma referência ao banco de dados e à coleção 'posts'
  const colecao = db.collection('posts');

  return colecao.find().toArray(); // Retorna todos os documentos da coleção como um array
};

export async function CriarPost(novoPost) {
  // Conecta ao banco de dados 'imersion-instabytes'
  const db = conexao.db('imersion-instabytes');

  // Seleciona a coleção 'posts' dentro do banco de dados
  const colecao = db.collection('posts');

  // Insere o novo post na coleção 'posts' e retorna o resultado da operação
  return colecao.insertOne(novoPost);
}

export async function AtualizarPost(id, novoPost) {
  // Conecta ao banco de dados 'imersion-instabytes'
  const db = conexao.db('imersion-instabytes');

  // Seleciona a coleção 'posts' dentro do banco de dados
  const colecao = db.collection('posts');

  // Converte o ID do post em um objeto ObjectId do MongoDB
  const objID = ObjectId.createFromHexString(id);

  // Atualiza o post com o ID especificado, substituindo os campos com os novos valores
  return colecao.updateOne({_id: new ObjectId(objID)}, {$set: novoPost});
}

