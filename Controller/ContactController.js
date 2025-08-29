import Contact from '../Model/Contact.js';
import ContactService from '../Service/ContactService.js';

class ContactController {

    async createContact(req, res) {
        try {
            const { name, phone, address, email } = req.body;

            const sanitizedContact = ContactService.sanitizeContact({
                name,
                phone,
                address,
                email
            });

            const validation = ContactService.validateContact(sanitizedContact);

            if (!validation.isValid) {
                return res.status(400).json({ 
                    message: 'Validation failed', 
                    errors: validation.errors 
                });
            }

            const contact = await Contact.create(sanitizedContact);
            res.status(201).json(contact);
        } catch (error) {
            res.status(400).json({ message: 'Error creating contact', error: error.message });
        }
    }

}

export default new ContactController();