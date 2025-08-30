import Contact from '../Model/Contact.js'
import ContactService from '../Service/ContactService.js'
import WeatherService from '../Service/WeatherService.js'
class ContactController {

    async createContact(req, res) {
        try {
            const { name, phone, address, email } = req.body

            const sanitizedContact = ContactService.sanitizeContact({
                name,
                phone,
                address,
                email
            })

            const validation = ContactService.validateContact(sanitizedContact)

            if (!validation.isValid) {
                return res.status(400).json({ 
                    message: 'Validation failed', 
                    errors: validation.errors 
                })
            }

            const contact = await Contact.create(sanitizedContact)
            res.status(201).json(contact)
        } catch (error) {
            res.status(400).json({ message: 'Error creating contact', error: error.message })
        }
    }

    async searchContacts(req, res) {
        try {
            const { name, phone, email, address } = req.query

            const query = { isActive: true }
            
            if (name) {
                query.name = { $regex: name, $options: 'i' }
            }
            
            if (phone) {
                query.phone = { $in: [new RegExp(phone.replace(/\D/g, ''), 'i')] }
            }
            
            if (email) {
                query.email = { $regex: email, $options: 'i' }
            }
            
            if (address) {
                query.address = { $regex: address, $options: 'i' }
            }

            let contacts = await Contact.find(query);

            if (contacts.length === 0) {
                return res.status(200).json({
                    message: 'No contacts found matching the criteria'
                })
            }

            contacts = await Promise.all(contacts.map(async (contact) => {
                const weather = await WeatherService.getWeather(contact.address);
                return {
                    ...contact.toObject(),
                    weather
            }}))

            return res.status(200).json({
                contacts
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Error searching contacts',
                error: error.message
            })
        }
    }

    async updateContact(req, res) {
        try {
            const { id } = req.params
            const { name, phone, address, email } = req.body

            let contact = await Contact.findById(id);         
            if (!contact || !contact.isActive) {
                return res.status(404).json({
                    message: 'Contact not found or inactive'
                })
            }
            
            //update only provided fields
            name ? (contact.name = name) : null
            phone ? (contact.phone = phone) : null
            address ? (contact.address = address) : null
            email ? (contact.email = email) : null

            const sanitizedContact = ContactService.sanitizeContact(contact)

            const validation = ContactService.validateContact(sanitizedContact)
            
            if (!validation.isValid) {
                return res.status(400).json({
                    message: 'Validation failed',
                    errors: validation.errors
                })
            }

            const updatedContact = await Contact.findOneAndUpdate(
                { _id: id, isActive: true },
                sanitizedContact,
                { new: true }
            )

            return res.status(200).json({
                message: 'Contact updated successfully',
                contact: updatedContact
            })

        } catch (error) {
            return res.status(500).json({
                message: 'Error updating contact',
                error: error.message
            })
        }
    }

    async deleteContact(req, res) {
        try {
            const { id } = req.params

            const contact = await Contact.findByIdAndUpdate(
                id,
                { isActive: false },
                { new: true }
            )

            if (!contact) {
                return res.status(404).json({ 
                    message: 'Contact not found'
                })
            }

            return res.status(200).json({
                message: 'Contact deleted successfully',
                contact
            });
        } catch (error) {
            return res.status(500).json({ 
                message: 'Error deleting contact', 
                error: error.message 
            })
        }
    }

}


export default new ContactController()