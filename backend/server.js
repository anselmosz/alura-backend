import express from 'express';
import conectarAoBanco from './src/config/dbConfig.js';
const conexao = await conectarAoBanco(process.env.CONNECTION_STRING);

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log('Server listening...');
});

async function getAllPosts() {
  const db = conexao.db('imersion-instabytes');
  const colecao = db.collection('posts');
  return colecao.find().toArray();
};

app.get('/posts', async (req, res) => {
  const posts = await getAllPosts();
  res.status(200).json(posts);
});

// function SearchPostByID(id){
//   return posts.findIndex((posts)=> {
//     return posts.id === Number(id);
//   });
// };

// app.get('/posts/:id', (req, res) => {
//   const index = SearchPostByID(req.params.id);
//   res.status(200).json(posts[index]);
// });