import mongoose, { Schema } from "mongoose";
const { ObjectId } = Schema;

const contactNumberSchema = new Schema({
  mobile: {
    type: Number,
    required: true,
  },
  work: { type: Number },
  home: { type: Number },
});

const contactSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    image: {
      url: String,
      publicId: String,
    },
    email: {
      type: String,
      trim: true,
    },
    contactNumber: [contactNumberSchema],
    country: {
      type: String,
    },
    address: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female", "prefer not to say"],
    },
    slug: {
      type: String,
      unique: true,
    },
    createdBy: {
      type: ObjectId,
      ref: "User",
    },
    favorites: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
