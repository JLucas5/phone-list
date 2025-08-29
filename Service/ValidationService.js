class ValidationService {

    /**
     * Validates phone number format
     * @param {string} phone - Phone number to validate
     * @returns {boolean} - True if phone number is valid
     */
    static isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    /**
     * Validates a complete contact object
     * @param {Object} contact - Contact object to validate
     * @returns {Object} - { isValid: boolean, errors: string[] }
     */
    static validateContact(contact) {
        const errors = [];

        if (!contact.name || contact.name.length === 0) {
            errors.push('Name is required');
        }

        if (!contact.phone || !contact.phone.length) {
            errors.push('At least one phone number is required');
        }

        if (!this.isValidEmail(contact.email)) {
            errors.push('Invalid email format');
        }

        if (!contact.address || contact.address.length === 0) {
            errors.push('Address is required');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }
}

export default ValidationService;