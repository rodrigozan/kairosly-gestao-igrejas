import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ItemDetailModal from '@/components/ItemDetailModal';
import { PlaySquare, CalendarDays, Download } from 'lucide-react';

const mockMidias = [
  { id: '1', title: 'Pregação: A Força da Oração', date: '20 JUL, 2025', description: 'Ouça a mensagem impactante do Pr. Carlos sobre o poder da oração.', type: 'audio', image: 'microphone in a recording studio', fullContent: 'Áudio completo da pregação "A Força da Oração". Descubra como a oração pode transformar sua vida e fortalecer sua fé. Duração: 45 minutos.' },
  { id: '2', title: 'Vídeo: Testemunho de Transformação', date: '10 JUL, 2025', description: 'Assista ao testemunho emocionante de Maria, que teve sua vida restaurada.', type: 'video', image: 'person sharing a testimony on stage', fullContent: 'Vídeo do testemunho de Maria. Ela compartilha como encontrou esperança e um novo começo através da fé. Inspire-se com esta história de superação. Duração: 15 minutos.' },
  { id: '3', title: 'E-book: Fundamentos da Fé Cristã', date: '01 JUL, 2025', description: 'Baixe gratuitamente nosso e-book sobre os pilares da fé.', type: 'ebook', image: 'ebook cover design with a cross', fullContent: 'Este e-book aborda os principais ensinamentos da fé cristã de forma clara e acessível. Ideal para novos convertidos e para quem deseja aprofundar seus conhecimentos. Formato PDF, 50 páginas.' },
];

const MidiasPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (item) => {
    setSelectedItem(item);
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
      <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Mídias</h1>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {mockMidias.map((midia) => (
          <motion.div key={midia.id} variants={itemVariants}>
            <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group h-full flex flex-col glass-card">
              <CardHeader className="p-0 relative">
                <img  
                  alt={midia.title} 
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" 
                 src="https://images.unsplash.com/photo-1676279168652-90cb5e7c4af7" />
                <div className="absolute top-2 right-2 bg-primary/80 text-primary-foreground px-2 py-1 text-xs rounded">
                  {midia.type.toUpperCase()}
                </div>
              </CardHeader>
              <CardContent className="p-6 flex-grow flex flex-col">
                <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">{midia.title}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <CalendarDays className="w-4 h-4 mr-2" />
                  <span>{midia.date}</span>
                </div>
                <CardDescription className="text-sm text-foreground/80 mb-4 flex-grow">{midia.description}</CardDescription>
                <Button onClick={() => handleOpenModal(midia)} className="mt-auto w-full bg-primary/80 hover:bg-primary text-primary-foreground">
                  {midia.type === 'ebook' ? <Download className="mr-2 h-4 w-4" /> : <PlaySquare className="mr-2 h-4 w-4" />}
                  {midia.type === 'ebook' ? 'Baixar E-book' : 'Acessar Mídia'}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <ItemDetailModal isOpen={isModalOpen} onClose={handleCloseModal} item={selectedItem} />
    </motion.div>
  );
};

export default MidiasPage;