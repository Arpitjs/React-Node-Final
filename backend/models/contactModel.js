import mongoose, { Schema } from 'mongoose';

const contactSchema = new Schema({
    name: {
        type: String,
        trim: true,
        minlength: 5
    },
    phone: {
        type: Number,
        required: true
    },
    image: {
        url: String,
        publicId: String
    },
    email: {
        type: String,
        trim: true
    },
    country: {
        type: String
    },
    address: {
        type: String,
        trim: true
    },
    married: Boolean,
    slug: {
        type: String,
        unique: true
    }
}, {
    timestamps: true
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact; 