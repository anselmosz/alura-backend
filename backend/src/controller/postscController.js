// Importa as dependências necessárias:
import fs from 'fs'; // Módulo do Node.js para interagir com o sistema de arquivos
import { getAllPosts, CriarPost, AtualizarPost } from '../models/postsModel.js'; // Importa as funções para obter e criar posts do modelo

// Função para listar todos os posts:
export async function ListPosts(req, res) {
  // Obtém todos os posts do banco de dados usando a função getAllPosts
  const posts = await getAllPosts();
  // Envia uma resposta HTTP com status 200 (sucesso) e os posts no formato JSON
  res.status(200).json(posts);
};

// Função para criar um novo post:
export async function CriarNovoPost(req, res) {
  // Extrai os dados do novo post do corpo da requisição
  const novoPost = req.body;
  // Tenta criar o novo post no banco de dados
  try {
    const postCriado = await CriarPost(novoPost);
    // Envia uma resposta HTTP com status 200 (sucesso) e o post criado
    res.status(200).json(postCriado);
  // Caso ocorra algum erro durante a criação do post
  } catch (erro) {
    // Imprime o erro no console para facilitar o debugging
    console.error(erro.message);
    // Envia uma resposta HTTP com status 500 (erro interno do servidor) e uma mensagem de erro
    res.status(500).json({'erro' : 'Falha na requisição'})
  };
};

// Função para fazer upload de uma imagem e criar um novo post:
export async function UploadImagem(req, res) {
  // Cria um objeto com os dados do novo post, incluindo o nome original da imagem
  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt: ""
  };
  // Tenta criar o novo post e renomear a imagem
  try {
    const postCriado = await CriarPost(novoPost);
    // Constrói o novo nome da imagem com base no ID do post criado
    const imgAtualizada = `uploads/${postCriado.insertedId}.png`;
    // Renomeia o arquivo da imagem para o novo nome
    fs.renameSync(req.file.path, imgAtualizada);
    // Envia uma resposta HTTP com status 200 (sucesso) e o post criado
    res.status(200).json(postCriado);
  // Caso ocorra algum erro
  } catch (erro) {
    // Imprime o erro no console
    console.error(erro.message);
    // Envia uma resposta HTTP com status 500 (erro interno do servidor) e uma mensagem de erro
    res.status(500).json({'erro' : 'Falha na requisição'})
  };
};

export async function AtualizaNovoPost(req, res) {
  // Cria um objeto com os dados do novo post, incluindo o nome original da imagem
  const postId = req.params.id;
  const urlImg = `http://localhost:3000/${postId}.png`;
  const postAtualizado = {
    imgUrl: urlImg,
    descricao: req.body.descricao,
    alt: req.body.alt
  };

  try {
    const postCriado = await AtualizarPost(postId, postAtualizado);
    res.status(200).json(postCriado);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({'erro' : 'Falha na requisição'})
  };
};
