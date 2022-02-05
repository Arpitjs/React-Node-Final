import mongoose, { Schema } from 'mongoose';
const { ObjectId } = Schema;

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
    gender: {
        type: String,
        enum: ['male','female', 'prefer not to say']
    },
    slug: {
        type: String,
        unique: true
    },
    favorites: [
           {
           type: ObjectId, ref: 'User'
           }
    ]
}, {
    timestamps: true
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact; 