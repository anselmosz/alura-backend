import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { ListPosts, CriarNovoPost, UploadImagem, AtualizaNovoPost } from '../controller/postscController.js';

const corsOptions = {
  origin : "http://localhost:8000",
  optionsSuccessStatus : 200
}

const upload = multer({dest: './uploads'});  

const Routes = (app) => {
  app.use(express.json()); // Configura o middleware para interpretar requisições com corpo em formato JSON
  app.use(cors(corsOptions));
  app.get('/posts', ListPosts); // Define uma rota GET para o endpoint '/posts'
  app.post('/posts', CriarNovoPost); // Define uma rota POST para enviar um novo objeto para o endpint '/posts'
  app.post('/upload', upload.single('imagem'), UploadImagem); // Define uma rota POST para enviar um novo objeto através da função UploadImagem
  app.put('/upload/:id', AtualizaNovoPost);
}

export default Routes;
