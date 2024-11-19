import express from 'express';

const posts = [
  {
    id: 1,
    descricao: 'um teste do post',
    imagem: 'https://placecats.com/millie/300/150'
  },
  {
    id: 2,
    descricao: 'Descrição do segundo post',
    imagem: 'https://placecats.com/200/300'
  },
  {
    id: 3,
    descricao: 'Terceiro post: Uma imagem legal',
    imagem: 'https://placekitten.com/400/200'
  },
  {
    id: 4,
    descricao: 'Post 4: Mais um exemplo',
    imagem: 'https://picsum.photos/id/237/200/300'
  },
  {
    id: 5,
    descricao: 'Último post da lista',
    imagem: 'https://source.unsplash.com/random/200x300'
  }
];

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log('Server listening...');
});

app.get('/posts/', (req, res) => {
  res.status(200).json(posts);
});

function SearchPostByID(id){
  return posts.findIndex((posts)=> {
    return posts.id === Number(id);
  });
};

app.get('/posts/:id', (req, res) => {
  const index = SearchPostByID(req.params.id);
  res.status(200).json(posts[index]);
});