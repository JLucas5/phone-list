import Contact from '../Model/Contact.js';
import ValidationService from '../Service/ValidationService.js';

class ContactController {

    // Create new contact
    async createContact(req, res) {
        try {
            const { name, phone, address, email } = req.body;

            const validation = ValidationService.validateContact({
                name,
                phone,
                address,
                email
            });

            if (!validation.isValid) {
                return res.status(400).json({ 
                    message: 'Validation failed', 
                    errors: validation.errors 
                });
            }

            const contact = await Contact.create({
                name,
                phone,
                address,
                email
            });
            res.status(201).json(contact);
        } catch (error) {
            res.status(400).json({ message: 'Error creating contact', error: error.message });
        }
    }

}

export default new ContactController();