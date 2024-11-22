// Importa o framework Express para criar a aplicação web
import express from 'express';
import Routes from './src/routes/postsRoutes.js';

const app = express();
app.use(express.static("uploads"))
Routes(app);

// Inicia o servidor na porta 3000 e exibe uma mensagem no console
app.listen(3000, () => {
  console.log('Server listening...');
});
