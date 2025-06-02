import mongoose, { Schema, Document, Types } from 'mongoose';

// Interface para links de redes sociais
interface ISocialLink {
  platform: string; // Ex: Facebook, Instagram, YouTube
  url: string;
}

// Interface para horários de culto/serviço
interface IServiceTime {
  dayOfWeek: string; // Ex: Domingo, Quarta-feira
  time: string; // Ex: 10:00, 19:30
  description?: string; // Ex: Culto de Celebração, Estudo Bíblico
}

// Interface para o documento da Igreja
export interface IChurch extends Document {
  name: string;
  registeredBy: Types.ObjectId; // Usuário MASTER que registrou a igreja
  history?: string;
  mission?: string;
  vision?: string;
  values?: string[];
  address?: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  serviceTimes?: IServiceTime[];
  socialLinks?: ISocialLink[];
  imageUrl?: string;
  youtubeChannelId?: string; // ID do canal do YouTube para integração /api/live
  createdAt: Date;
  updatedAt: Date;
}

const SocialLinkSchema = new Schema<ISocialLink>({
  platform: { type: String, required: true },
  url: { type: String, required: true },
}, { _id: false });

const ServiceTimeSchema = new Schema<IServiceTime>({
  dayOfWeek: { type: String, required: true },
  time: { type: String, required: true },
  description: { type: String },
}, { _id: false });

const ChurchSchema = new Schema<IChurch>(
  {
    name: { type: String, required: true, unique: true },
    registeredBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    history: { type: String },
    mission: { type: String },
    vision: { type: String },
    values: [{ type: String }],
    address: {
      street: { type: String },
      number: { type: String },
      complement: { type: String },
      neighborhood: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
    },
    serviceTimes: [ServiceTimeSchema],
    socialLinks: [SocialLinkSchema],
    imageUrl: { type: String },
    youtubeChannelId: { type: String },
  },
  { timestamps: true } // Adiciona createdAt e updatedAt automaticamente
);

const Church = mongoose.model<IChurch>('Church', ChurchSchema);

export default Church;

