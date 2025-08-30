import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import contactRoutes from './Routes/contact.routes.js'

const app = express();
const port = process.env.PORT || 3000

mongoose.connect(`${process.env.MONGO_URI}/phone-list` || "mongodb://127.0.0.1:27017/phone-list")

app.use(express.json())

app.use('/contacts', contactRoutes)

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)})