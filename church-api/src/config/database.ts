import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      console.error('Erro: MONGO_URI não definido no arquivo .env');
      process.exit(1);
    }
    await mongoose.connect(mongoURI);
    console.log('MongoDB conectado com sucesso.');
  } catch (err: any) {
    console.error('Erro ao conectar ao MongoDB:', err.message);
    // Sair do processo com falha
    process.exit(1);
  }
};

export default connectDB;

