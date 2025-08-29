import { Router } from 'express';
import ContactController from '../Controller/ContactController.js';

const contactRoutes = Router();

// Fix: Bind the method to maintain context
contactRoutes.post('/create', (req, res) => ContactController.createContact(req, res));

export default contactRoutes;