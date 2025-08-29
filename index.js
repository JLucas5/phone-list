const express = require('express');
import mongoose from 'mongoose';
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(`mongodb+srv://admin:${process.env.MONGO_PASSWORD}@phone-list.8jpjvti.mongodb.net/?retryWrites=true&w=majority&appName=phone-list`)

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Bem-vindo à API PhoneList!');
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)})