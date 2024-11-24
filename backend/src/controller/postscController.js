// Importa as dependências necessárias:
import fs from 'fs'; // Módulo do Node.js para interagir com o sistema de arquivos
import { getAllPosts, CriarPost, AtualizarPost } from '../models/postsModel.js'; // Importa as funções para obter e criar posts do modelo
import gerarDescricaoComGemini from '../services/geminiService.js';

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

// Função para atualizar os dados de um objeto de posts:
export async function AtualizaNovoPost(req, res) {
  // Obtém o ID do post a ser atualizado a partir dos parâmetros da requisição
  const postId = req.params.id;

  // Constrói a URL completa da imagem, assumindo que a imagem está armazenada localmente
  const urlImg = `http://localhost:3000/${postId}.png`;

  try {
    // Lê o arquivo de imagem do sistema de arquivos e o armazena em um buffer
    const imageBuffer = fs.readFileSync(`uploads/${postId}.png`);

    // Chama uma função externa (gerarDescricaoComGemini) para gerar uma descrição detalhada da imagem
    // Essa função provavelmente utiliza um modelo de linguagem como o Gemini para gerar a descrição
    const descDetailed = await gerarDescricaoComGemini(imageBuffer);

    // Cria um objeto com os dados atualizados do post, incluindo a URL da imagem, a descrição detalhada e a tag alt
    const postAtualizado = {
      imgUrl: urlImg,
      descricao: descDetailed,
      alt: req.body.alt
    };

    // Chama uma função (AtualizarPost) para atualizar o post no banco de dados com os novos dados
    const postCriado = await AtualizarPost(postId, postAtualizado);

    // Retorna uma resposta HTTP com status 200 (sucesso) e o post atualizado como JSON
    res.status(200).json(postCriado);
  } catch (erro) {
    // Captura qualquer erro que possa ocorrer durante o processo
    console.error(erro.message);

    // Retorna uma resposta HTTP com status 500 (erro interno do servidor) e uma mensagem de erro genérica
    res.status(500).json({'erro' : 'Falha na requisição'});
  }
};
