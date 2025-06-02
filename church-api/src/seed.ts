import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/database';
import User, { UserRole } from './models/User';
import Church from './models/Church';

dotenv.config();

const seedData = async () => {
  await connectDB();

  try {
    // Limpar dados existentes (CUIDADO: Use apenas em desenvolvimento!)
    console.log('Limpando dados antigos...');
    await User.deleteMany({});
    await Church.deleteMany({});
    // Adicionar limpeza de outros modelos aqui (Highlights, Events, etc.) quando forem implementados
    console.log('Dados antigos limpos.');

    // --- Criar Usuário Master ---
    console.log('Criando usuário Master...');
    const masterUser = await User.create({
      name: 'Master Admin',
      email: 'master@example.com',
      password: 'password123', // Senha será hasheada pelo pre-save hook
      role: UserRole.MASTER,
      isActive: true,
      churchId: null // Master não pertence a uma igreja específica
    });
    console.log(`Usuário Master criado: ${masterUser.email}`);

    // --- Criar Igreja Exemplo ---
    console.log('Criando Igreja Exemplo...');
    const exampleChurch = await Church.create({
      name: 'Igreja Exemplo Central',
      registeredBy: masterUser._id,
      history: 'Uma breve história da nossa igreja...', 
      mission: 'Nossa missão é...', 
      vision: 'Nossa visão é...', 
      values: ['Fé', 'Comunidade', 'Serviço'],
      address: {
        street: 'Rua Exemplo', 
        number: '123', 
        neighborhood: 'Centro', 
        city: 'Cidade Exemplo', 
        state: 'EX', 
        zipCode: '12345-678'
      },
      serviceTimes: [
        { dayOfWeek: 'Domingo', time: '10:00', description: 'Culto de Celebração' },
        { dayOfWeek: 'Domingo', time: '18:00', description: 'Culto da Família' },
        { dayOfWeek: 'Quarta-feira', time: '19:30', description: 'Estudo Bíblico' }
      ],
      socialLinks: [
        { platform: 'Facebook', url: 'https://facebook.com/igrejaexemplo' },
        { platform: 'Instagram', url: 'https://instagram.com/igrejaexemplo' }
      ],
      youtubeChannelId: 'UCxxxxxxxxxxxxxxxxxxxxxx' // Substituir pelo ID real se tiver
    });
    console.log(`Igreja Exemplo criada: ${exampleChurch.name}`);

    // --- Criar Usuário Admin para a Igreja Exemplo ---
    console.log('Criando usuário Admin para a Igreja Exemplo...');
    const adminUser = await User.create({
        name: 'Admin da Igreja',
        email: 'admin@examplechurch.com',
        password: 'password123',
        role: UserRole.ADMIN,
        isActive: true,
        churchId: exampleChurch._id // Associado à Igreja Exemplo
    });
    console.log(`Usuário Admin criado: ${adminUser.email}`);

    // --- Criar Usuário Editor para a Igreja Exemplo ---
    console.log('Criando usuário Editor para a Igreja Exemplo...');
    const editorUser = await User.create({
        name: 'Editor Conteúdo',
        email: 'editor@examplechurch.com',
        password: 'password123',
        role: UserRole.EDITOR,
        isActive: true,
        churchId: exampleChurch._id
    });
    console.log(`Usuário Editor criado: ${editorUser.email}`);

    // --- Criar Usuário Leitor (Reader) para a Igreja Exemplo ---
    console.log('Criando usuário Leitor para a Igreja Exemplo...');
    const readerUser = await User.create({
        name: 'Membro Comum',
        email: 'reader@examplechurch.com',
        password: 'password123',
        role: UserRole.READER,
        isActive: true,
        churchId: exampleChurch._id,
        birthDate: new Date('1990-05-15')
    });
    console.log(`Usuário Leitor criado: ${readerUser.email}`);

    console.log('Dados de exemplo inseridos com sucesso!');
    process.exit(0);

  } catch (error) {
    console.error('Erro ao inserir dados de exemplo:', error);
    process.exit(1);
  }
};

seedData();

