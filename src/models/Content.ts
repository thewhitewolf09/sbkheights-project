import mongoose, { Schema, model, models } from 'mongoose';

const ContentSchema = new Schema({
  page: { type: String, required: true }, // e.g., 'home', 'about', 'mission', 'project'
  section: { type: String, required: true }, // e.g., 'banner', 'intro_text', 'mission_statement'
  content: { type: Schema.Types.Mixed, required: true }, // can be string, object, array
});

// Compound index to quickly find content
ContentSchema.index({ page: 1, section: 1 }, { unique: true });

export const Content = models.Content || model('Content', ContentSchema);
