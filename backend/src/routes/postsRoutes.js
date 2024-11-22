import express from 'express';
import { ListPosts, CriarNovoPost, UploadImagem } from '../controller/postscController.js';
import multer from 'multer';

const upload = multer({dest: './uploads'});  

const Routes = (app) => {
  app.use(express.json()); // Configura o middleware para interpretar requisições com corpo em formato JSON
  app.get('/posts', ListPosts); // Define uma rota GET para o endpoint '/posts'
  app.post('/posts', CriarNovoPost); // Define uma rota POST para enviar um novo objeto para o endpint '/posts'
  app.post('/upload', upload.single('imagem'), UploadImagem);
}

export default Routes;
