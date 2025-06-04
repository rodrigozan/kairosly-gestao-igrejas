import mongoose, { Schema, Document, Types } from 'mongoose';

// Interface para o documento Highlight
export interface IHighlight extends Document {
  title: string;
  imageUrl: string;
  description?: string;
  link?: string; // Link opcional para direcionar o usuário
  churchId: Types.ObjectId; // Igreja à qual o destaque pertence
  createdBy: Types.ObjectId; // Usuário que criou o destaque
  createdAt: Date;
  updatedAt: Date;
}

const HighlightSchema = new Schema<IHighlight>(
  {
    title: { type: String, required: true },
    imageUrl: { type: String, required: true }, // URL da imagem
    description: { type: String },
    link: { type: String },
    churchId: { type: Schema.Types.ObjectId, ref: 'Church', required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true } // Adiciona createdAt e updatedAt automaticamente
);

// Índice para buscar destaques por igreja
HighlightSchema.index({ churchId: 1 });

const Highlight = mongoose.model<IHighlight>('Highlight', HighlightSchema);

export default Highlight;

