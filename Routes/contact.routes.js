import { Router } from 'express'
import ContactController from '../Controller/ContactController.js'

const contactRoutes = Router()

contactRoutes.post('/create', (req, res) => ContactController.createContact(req, res))
contactRoutes.delete('/delete/:id', (req, res) => ContactController.deleteContact(req, res))
contactRoutes.put('/update/:id', (req, res) => ContactController.updateContact(req, res))
contactRoutes.get('/search', (req, res) => ContactController.searchContacts(req, res))
export default contactRoutes