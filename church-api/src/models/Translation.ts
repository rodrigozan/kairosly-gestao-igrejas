import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ITranslation extends Document {
  language: string;
  namespace: string;
  date: Date;
  data: object;
  imageUrl?: string;
  createdBy: Types.ObjectId; 
  createdAt: Date;
  updatedAt: Date;
}

const TranslationSchema = new Schema<ITranslation>({
  language: { type: String, required: true },
  namespace: { type: String, default: "translation" },
  data: { type: Object, required: true }
},
  { timestamps: true }
);

const Translation = mongoose.model<ITranslation>("Translation", TranslationSchema);

export default Translation;
