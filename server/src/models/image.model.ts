import mongoose, { Document, Schema } from 'mongoose';

export interface IGeneratedImage extends Document {
  characterId: mongoose.Types.ObjectId;
  imageUrl: string;
  isFavorite: boolean;
  version: number;
  refinedPrompt?: string;
  createdAt: Date;
}

const GeneratedImageSchema = new Schema<IGeneratedImage>(
  {
    characterId: { type: Schema.Types.ObjectId, ref: 'Character', required: true },
    imageUrl: { type: String, required: true },
    isFavorite: { type: Boolean, default: false },
    version: { type: Number, default: 1 },
    refinedPrompt: { type: String },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model<IGeneratedImage>('GeneratedImage', GeneratedImageSchema); 