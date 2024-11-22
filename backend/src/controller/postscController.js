import { getAllPosts, CriarPost } from '../models/postsModel.js';

export async function ListPosts(req, res) {
  const posts = await getAllPosts(); // Obtém todos os posts chamando a função getAllPosts
  res.status(200).json(posts); // Envia uma resposta HTTP com status 200 e os posts no formato JSON
};

export async function CriarNovoPost(req, res) {
  const novoPost = req.body;    
  try {
    const postCriado = await CriarPost(novoPost);
    res.status(200).json(postCriado);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({'erro' : 'Falha na requisição'})
  };
};

export async function UploadImagem(req, res) {
  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt: ""
  };

  try {
    const postCriado = await CriarPost(novoPost);
    res.status(200).json(postCriado);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({'erro' : 'Falha na requisição'})
  };
};
