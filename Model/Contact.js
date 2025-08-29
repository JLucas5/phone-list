import mongoose from "mongoose";
const { Schema, model } = mongoose;

const contactSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: [String], required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    isActive: { type: Boolean, default: true },
});

const Contact = model('Contact', contactSchema);
export default Contact;