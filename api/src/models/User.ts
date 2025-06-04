import mongoose, { Schema, Document, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

// Enum para os papéis (roles)
export enum UserRole {
  MASTER = 'master',
  ADMIN = 'admin',
  EDITOR = 'editor',
  PUBLISHER = 'publisher',
  READER = 'reader',
}

// Interface para representar um membro da família
interface IFamilyMember {
  userId: Types.ObjectId; // Referência ao documento do usuário membro da família
  relationship: string; // Ex: 'Cônjuge', 'Filho(a)'
}

// Interface para o documento do Usuário
export interface IUser extends Document {
  name: string;
  email: string;
  password?: string; // Senha é opcional no retorno, mas obrigatória no registro
  role: UserRole;
  churchId: Types.ObjectId | null; // ID da igreja à qual o usuário pertence (pode ser null inicialmente ou para MASTER)
  isActive: boolean;
  birthDate?: Date;
  photoUrl?: string;
  familyMembers: IFamilyMember[];
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const FamilyMemberSchema = new Schema<IFamilyMember>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  relationship: { type: String, required: true },
}, { _id: false });

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false }, // Não retorna a senha por padrão
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.READER, // Papel padrão é Reader
      required: true,
    },
    churchId: { type: Schema.Types.ObjectId, ref: 'Church', default: null },
    isActive: { type: Boolean, default: true },
    birthDate: { type: Date },
    photoUrl: { type: String },
    familyMembers: [FamilyMemberSchema],
  },
  { timestamps: true } // Adiciona createdAt e updatedAt automaticamente
);

// Middleware pré-save para hash da senha
UserSchema.pre<IUser>('save', async function (next) {
  // Só faz o hash se a senha foi modificada (ou é nova)
  if (!this.isModified('password') || !this.password) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Método para comparar senha candidata com a senha no banco
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<IUser>('User', UserSchema);

export default User;

