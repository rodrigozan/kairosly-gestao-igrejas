import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ItemDetailModal from '@/components/ItemDetailModal';
import { CalendarDays, ArrowRight } from 'lucide-react';

const mockEventos = [
  { id: '1', title: 'Conferência de Jovens Conectados', date: '15-17 AGO, 2025', description: 'Um final de semana de imersão na Palavra, louvor e comunhão para jovens.', image: 'group of young people worshiping at a conference', fullContent: 'Detalhes completos sobre a Conferência de Jovens Conectados... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  { id: '2', title: 'Culto Especial de Páscoa', date: '20 ABR, 2025', description: 'Celebre conosco a ressurreição de Cristo em um culto emocionante.', image: 'church decorated for Easter with a cross', fullContent: 'Venha celebrar a Páscoa conosco! Teremos apresentações especiais, uma mensagem poderosa e um tempo de adoração inesquecível. Traga sua família e amigos.' },
  { id: '3', title: 'Acampamento de Casais', date: '05-07 SET, 2025', description: 'Fortaleça seu casamento com palestras, dinâmicas e momentos de lazer.', image: 'couple holding hands walking in nature', fullContent: 'Um retiro pensado para casais que desejam investir em seu relacionamento. Serão dias de aprendizado, renovação e muita diversão em um ambiente inspirador.'},
];

const EventosPage = () => {
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
      <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Eventos</h1>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {mockEventos.map((evento) => (
          <motion.div key={evento.id} variants={itemVariants}>
            <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group h-full flex flex-col glass-card">
              <CardHeader className="p-0">
                <img  
                  alt={evento.title} 
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" 
                 src="https://images.unsplash.com/photo-1649190800807-6f1d42a4bc05" />
              </CardHeader>
              <CardContent className="p-6 flex-grow flex flex-col">
                <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">{evento.title}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <CalendarDays className="w-4 h-4 mr-2" />
                  <span>{evento.date}</span>
                </div>
                <CardDescription className="text-sm text-foreground/80 mb-4 flex-grow">{evento.description}</CardDescription>
                <Button onClick={() => handleOpenModal(evento)} className="mt-auto w-full bg-primary/80 hover:bg-primary text-primary-foreground">
                  Ver Detalhes <ArrowRight className="ml-2 h-4 w-4" />
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

export default EventosPage;