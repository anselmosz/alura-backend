import ConectarAoBanco from '../config/dbConfig.js';
// Conecta ao banco de dados usando a string de conexão fornecida pela variável de ambiente
const conexao = await ConectarAoBanco(process.env.CONNECTION_STRING);


// Função assíncrona para obter todos os posts de uma coleção específica
export default async function getAllPosts() {
  // Obtém uma referência ao banco de dados e à coleção 'posts'
  const db = conexao.db('imersion-instabytes');
  const colecao = db.collection('posts');

  // Retorna todos os documentos da coleção como um array
  return colecao.find().toArray();
}