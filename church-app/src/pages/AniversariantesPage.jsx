import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ItemDetailModal from '@/components/ItemDetailModal'; // Reutilizando para detalhes, se necessário
import { Cake, User } from 'lucide-react';

const mockAniversariantes = [
  { id: '1', nome: 'Ana Silva', dataNascimento: '05 AGO', foto: 'woman smiling portrait', ministerio: 'Louvor', mensagem: 'Feliz aniversário, Ana! Que Deus continue te abençoando grandemente. Sua voz é uma bênção para nossa igreja!' },
  { id: '2', nome: 'Carlos Pereira', dataNascimento: '12 AGO', foto: 'man smiling portrait', ministerio: 'Diaconato', mensagem: 'Parabéns, Carlos! Agradecemos por seu serviço e dedicação. Que seu dia seja especial!' },
  { id: '3', nome: 'Beatriz Lima', dataNascimento: '23 AGO', foto: 'young woman smiling portrait', ministerio: 'Ministério Infantil', mensagem: 'Feliz aniversário, Bia! As crianças amam você. Que seu novo ano seja cheio de alegrias!' },
  { id: '4', nome: 'João Santos', dataNascimento: '28 AGO', foto: 'elderly man smiling portrait', ministerio: 'Conselheiro', mensagem: 'Parabéns, irmão João! Sua sabedoria é um tesouro para nós. Muitas felicidades!' },
];

const AniversariantesPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal pode ser usado para exibir uma mensagem maior ou mais detalhes se necessário.
  // Por ora, o card já mostra bastante informação.
  const handleOpenModal = (aniversariante) => {
    setSelectedItem({
        title: `Aniversário de ${aniversariante.nome}`,
        date: aniversariante.dataNascimento,
        image: aniversariante.foto,
        fullContent: `${aniversariante.mensagem}\n\nMinistério: ${aniversariante.ministerio}`
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-8"
    >
      <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Aniversariantes do Mês</h1>
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {mockAniversariantes.map((aniversariante) => (
          <motion.div key={aniversariante.id} variants={itemVariants} onClick={() => handleOpenModal(aniversariante)} className="cursor-pointer">
            <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group h-full flex flex-col items-center text-center glass-card p-6">
              <Avatar className="w-24 h-24 mb-4 border-4 border-primary group-hover:border-purple-400 transition-colors">
                <AvatarImage src={`https://source.unsplash.com/random/150x150/?${aniversariante.foto}`} alt={aniversariante.nome} />
                <AvatarFallback><User className="w-12 h-12 text-primary" /></AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl mb-1 group-hover:text-primary transition-colors">{aniversariante.nome}</CardTitle>
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <Cake className="w-4 h-4 mr-2 text-pink-500" />
                <span>{aniversariante.dataNascimento}</span>
              </div>
              <CardDescription className="text-xs text-foreground/70">{aniversariante.ministerio}</CardDescription>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      <ItemDetailModal isOpen={isModalOpen} onClose={handleCloseModal} item={selectedItem} />
    </motion.div>
  );
};

export default AniversariantesPage;