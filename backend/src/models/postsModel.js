import ConectarAoBanco from '../config/dbConfig.js';
const conexao = await ConectarAoBanco(process.env.CONNECTION_STRING); // Conecta ao banco de dados usando a string de conexão fornecida pela variável de ambiente

// Função assíncrona para obter todos os posts de uma coleção específica
export async function getAllPosts() {
  const db = conexao.db('imersion-instabytes'); // Obtém uma referência ao banco de dados e à coleção 'posts'
  const colecao = db.collection('posts');

  return colecao.find().toArray(); // Retorna todos os documentos da coleção como um array
};

export async function CriarPost(novoPost) {
  const db = conexao.db('imersion-instabytes');
  const colecao = db.collection('posts');

  return colecao.insertOne(novoPost);
};