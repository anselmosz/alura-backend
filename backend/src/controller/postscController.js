import getAllPosts from '../models/postsModel.js';

export default async function ListPosts(req, res){
  // Obtém todos os posts chamando a função getAllPosts
  const posts = await getAllPosts();

  // Envia uma resposta HTTP com status 200 e os posts no formato JSON
  res.status(200).json(posts);
};
