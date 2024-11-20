import express from 'express';
import ListPosts from '../controller/postscController.js';

const Routes = (app) => {
  // Configura o middleware para interpretar requisições com corpo em formato JSON
  app.use(express.json());
  // Define uma rota GET para o endpoint '/posts'
  app.get('/posts', ListPosts);
}

export default Routes;
