import mongoose, { Schema, model, models } from 'mongoose';

const GallerySchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true }, // URL to image or video
  type: { type: String, enum: ['photo', 'video'], required: true },
  order: { type: Number, default: 0 },
});

export const Gallery = models.Gallery || model('Gallery', GallerySchema);
