import mongoose, { Schema, Document, Types } from 'mongoose';

// Interface para o documento Event
export interface IEvent extends Document {
  title: string;
  description?: string;
  date: Date;
  location?: string;
  imageUrl?: string;
  churchId: Types.ObjectId; // Igreja à qual o evento pertence
  createdBy: Types.ObjectId; // Usuário que criou o evento
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    location: { type: String },
    imageUrl: { type: String }, // URL da imagem do evento
    churchId: { type: Schema.Types.ObjectId, ref: 'Church', required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true } // Adiciona createdAt e updatedAt automaticamente
);

// Índice para buscar eventos por igreja e ordenar por data
EventSchema.index({ churchId: 1, date: 1 });

const Event = mongoose.model<IEvent>('Event', EventSchema);

export default Event;

