import mongoose, { Document, Schema } from 'mongoose';

export interface ICharacterAttributes {
  age?: number;
  gender?: string;
  emotion?: string;
  genre?: string;
  style?: string;
}

export interface ICharacter extends Document {
  userId?: string;
  name: string;
  description: string;
  attributes: ICharacterAttributes;
  prompt: string;
  createdAt: Date;
}

const CharacterSchema = new Schema<ICharacter>(
  {
    userId: { type: String },
    name: { type: String, required: true },
    description: { type: String, required: true },
    attributes: {
      age: { type: Number },
      gender: { type: String },
      emotion: { type: String },
      genre: { type: String },
      style: { type: String }
    },
    prompt: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model<ICharacter>('Character', CharacterSchema); 