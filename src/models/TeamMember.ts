import mongoose, { Schema, model, models } from 'mongoose';

const TeamMemberSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  photoUrl: { type: String, required: false },
  description: { type: String, required: false },
  order: { type: Number, default: 0 },
});

export const TeamMember = models.TeamMember || model('TeamMember', TeamMemberSchema);
