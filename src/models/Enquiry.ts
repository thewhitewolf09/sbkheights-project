import mongoose, { Schema, model, models } from 'mongoose';

const EnquirySchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: false },
  message: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

export const Enquiry = models.Enquiry || model('Enquiry', EnquirySchema);
