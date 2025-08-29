import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import contactRoutes from './Routes/contact.routes.js';


const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(`mongodb+srv://admin:${process.env.MONGO_PASSWORD}@phone-list.8jpjvti.mongodb.net/?retryWrites=true&w=majority&appName=phone-list`)

app.use(express.json());

app.use('/contacts', contactRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)})